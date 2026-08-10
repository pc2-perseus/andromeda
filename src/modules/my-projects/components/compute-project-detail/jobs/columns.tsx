import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReorderIcon from "@mui/icons-material/Reorder";
import { type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import type { Job } from "../../../../../types/perseus/Job.ts";
import ClusterChip from "./ClusterChip.tsx";
import StateIcon from "./StateIcon.tsx";
import { formatJobDisplayId, isGroupJob } from "../../../utils/jobGrouping.ts";

function getStateTooltipLabel(
    job: Job,
    includeGroupIndexInId: boolean
): string {
    if (isGroupJob(job) && !includeGroupIndexInId) {
        return "Group jobs";
    }

    return job.state ?? "Unknown state";
}

export function createJobColumns({
    showUserColumn,
    includeGroupIndexInId = false,
    onOpenJobDetails,
    onOpenGroupDetails,
}: {
    showUserColumn: boolean;
    includeGroupIndexInId?: boolean;
    onOpenJobDetails: (job: Job) => void;
    onOpenGroupDetails?: (job: Job) => void;
}): GridColDef<Job>[] {
    const baseColumns: GridColDef<Job>[] = [
        {
            field: "state",
            headerName: "",
            width: 56,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            align: "center",
            renderCell: (params: GridRenderCellParams<Job, Job["state"]>) => (
                <Tooltip
                    title={getStateTooltipLabel(
                        params.row,
                        includeGroupIndexInId
                    )}
                >
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {isGroupJob(params.row) && !includeGroupIndexInId ? (
                            <ReorderIcon color="action" />
                        ) : (
                            <StateIcon state={params.value ?? null} />
                        )}
                    </Box>
                </Tooltip>
            ),
        },
        {
            field: "details",
            headerName: "",
            width: 56,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            align: "center",
            renderCell: (params: GridRenderCellParams<Job>) => {
                const openGroupDetails =
                    isGroupJob(params.row) &&
                    !includeGroupIndexInId &&
                    onOpenGroupDetails !== undefined;

                return (
                    <Tooltip
                        title={openGroupDetails ? "Group jobs" : "Job details"}
                    >
                        <IconButton
                            size="small"
                            onClick={() =>
                                openGroupDetails
                                    ? onOpenGroupDetails(params.row)
                                    : onOpenJobDetails(params.row)
                            }
                        >
                            <InfoOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                );
            },
        },
        {
            field: "job_id",
            headerName: "ID",
            minWidth: 140,
            flex: 0.8,
            renderCell: (params: GridRenderCellParams<Job, Job["job_id"]>) => {
                return (
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center", minWidth: 0 }}
                    >
                        <Typography variant="body2" noWrap>
                            {formatJobDisplayId(
                                params.row,
                                includeGroupIndexInId
                            )}
                        </Typography>
                    </Stack>
                );
            },
        },
        {
            field: "job_name",
            headerName: "Name",
            minWidth: 240,
            flex: 1,
            renderCell: (
                params: GridRenderCellParams<Job, Job["job_name"]>
            ) => (
                <Typography variant="body2" noWrap>
                    {params.value ?? "-"}
                </Typography>
            ),
        },
        {
            field: "cluster_id",
            headerName: "Cluster",
            minWidth: 180,
            flex: 0.8,
            renderCell: (
                params: GridRenderCellParams<Job, Job["cluster_id"]>
            ) => <ClusterChip clusterId={params.value ?? ""} />,
        },
        {
            field: "partition",
            headerName: "Partition",
            minWidth: 160,
            flex: 0.8,
        },
        {
            field: "working_directory",
            headerName: "Working Directory",
            minWidth: 360,
            flex: 1.4,
        },
    ];

    if (showUserColumn) {
        baseColumns.push({
            field: "user",
            headerName: "User",
            minWidth: 140,
            flex: 0.7,
        });
    }

    return baseColumns;
}
