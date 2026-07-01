import React from "react";
import { Alert, Box, IconButton, Stack, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
    DataGrid,
    type GridColDef,
    type GridPaginationMeta,
    type GridPaginationModel,
    type GridRenderCellParams,
} from "@mui/x-data-grid";
import type { Job } from "../../../../../types/perseus/Job.ts";
import useIsPIorPC from "../../../hooks/useIsPIorPC.ts";
import useJobs from "../../../hooks/useJobs.ts";
import type { MyProject } from "../../../types/project.ts";
import ClusterChip from "./ClusterChip.tsx";
import DetailDialog from "./dialog/index.tsx";
import Empty from "./Empty.tsx";
import StateIcon from "./StateIcon.tsx";

const DEFAULT_ROWS_PER_PAGE = 10;

export default function JobTable({
    project,
    computeProjectId,
}: {
    project: MyProject;
    computeProjectId: string;
}): React.ReactElement {
    const [paginationModel, setPaginationModel] =
        React.useState<GridPaginationModel>({
            page: 0,
            pageSize: DEFAULT_ROWS_PER_PAGE,
        });
    const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
    const showUserColumn = useIsPIorPC(project);
    const { jobs, loading, error } = useJobs(
        project._id,
        computeProjectId,
        paginationModel.page + 1,
        paginationModel.pageSize
    );
    const columns = React.useMemo<GridColDef<Job>[]>(() => {
        const baseColumns: GridColDef<Job>[] = [
            {
                field: "state",
                headerName: "",
                width: 56,
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                align: "center",
                renderCell: (
                    params: GridRenderCellParams<Job, Job["state"]>
                ) => <StateIcon state={params.value ?? null} />,
            },
            {
                field: "details",
                headerName: "",
                width: 56,
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                align: "center",
                renderCell: (params: GridRenderCellParams<Job>) => (
                    <Tooltip title="Job details">
                        <IconButton
                            size="small"
                            onClick={() => setSelectedJob(params.row)}
                        >
                            <InfoOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                ),
            },
            {
                field: "job_id",
                headerName: "ID",
                minWidth: 120,
                flex: 0.7,
            },
            {
                field: "job_name",
                headerName: "Name",
                minWidth: 240,
                flex: 1,
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
    }, [showUserColumn]);
    const rowCount =
        jobs.length < paginationModel.pageSize
            ? paginationModel.page * paginationModel.pageSize + jobs.length
            : -1;
    const paginationMeta = React.useMemo<GridPaginationMeta>(
        () => ({
            hasNextPage: jobs.length === paginationModel.pageSize,
        }),
        [jobs.length, paginationModel.pageSize]
    );

    return (
        <Stack spacing={2}>
            {error !== null ? <Alert severity="error">{error}</Alert> : null}

            <Box
                sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    overflow: "hidden",
                    "& .MuiDataGrid-cell": {
                        display: "flex",
                        alignItems: "center",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        fontWeight: 500,
                    },
                }}
            >
                <DataGrid
                    autoHeight
                    rows={jobs}
                    columns={columns}
                    rowCount={rowCount}
                    getRowId={(job) => job._id as string}
                    paginationMeta={paginationMeta}
                    loading={loading}
                    pagination
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[10, 25, 50]}
                    disableRowSelectionOnClick
                    disableColumnResize
                    hideFooterSelectedRowCount
                    slots={{
                        noRowsOverlay: Empty,
                    }}
                    slotProps={{
                        loadingOverlay: {
                            variant: "skeleton",
                            noRowsVariant: "skeleton",
                        },
                    }}
                />
            </Box>

            <DetailDialog
                job={selectedJob}
                open={selectedJob !== null}
                onClose={() => setSelectedJob(null)}
            />
        </Stack>
    );
}
