import React from "react";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import { DataGrid, type GridPaginationModel } from "@mui/x-data-grid";
import type { Job } from "../../../../../types/perseus/Job.ts";
import useIsPIorPC from "../../../hooks/useIsPIorPC.ts";
import useJobsQuery from "../../../hooks/useJobsQuery.ts";
import type { MyProject } from "../../../types/project.ts";
import { formatJobDisplayId } from "../../../utils/jobGrouping.ts";
import Empty from "./Empty.tsx";
import { createJobColumns } from "./columns.tsx";

const DEFAULT_ROWS_PER_PAGE = 10;
const DEFAULT_PAGINATION_MODEL: GridPaginationModel = {
    page: 0,
    pageSize: DEFAULT_ROWS_PER_PAGE,
};

export default function GroupJobsDialog({
    project,
    computeProjectId,
    groupJob,
    open,
    onClose,
    onOpenJobDetails,
}: {
    project: MyProject;
    computeProjectId: string;
    groupJob: Job | null;
    open: boolean;
    onClose: () => void;
    onOpenJobDetails: (job: Job) => void;
}): React.ReactElement {
    const showUserColumn = useIsPIorPC(project);
    const [paginationState, setPaginationState] = React.useState<{
        groupJobId: string | null;
        paginationModel: GridPaginationModel;
    }>({
        groupJobId: null,
        paginationModel: DEFAULT_PAGINATION_MODEL,
    });
    const groupJobId = groupJob?._id ?? null;
    const paginationModel =
        paginationState.groupJobId === groupJobId
            ? paginationState.paginationModel
            : DEFAULT_PAGINATION_MODEL;

    function handlePaginationModelChange(paginationModel: GridPaginationModel) {
        setPaginationState({
            groupJobId,
            paginationModel,
        });
    }

    const { data, isPending, isFetching, isError } = useJobsQuery({
        projectOid: project._id as string,
        computeProjectId,
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
        groupId: groupJob?.group_id ?? undefined,
        enabled: open && typeof groupJob?.group_id === "number",
    });

    const columns = React.useMemo(
        () =>
            createJobColumns({
                showUserColumn,
                includeGroupIndexInId: true,
                onOpenJobDetails,
            }),
        [onOpenJobDetails, showUserColumn]
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>
                Group Job {groupJob ? formatJobDisplayId(groupJob) : ""}
            </DialogTitle>

            <DialogContent dividers>
                <Stack spacing={2}>
                    <Typography color="text.secondary" variant="body2">
                        This group contains all jobs submitted under the
                        group_Id {groupJob?.group_id ?? ""}.
                    </Typography>

                    {isError && (
                        <Alert severity="error">
                            There was an error loading the group jobs
                        </Alert>
                    )}

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
                            rows={data?.jobs ?? []}
                            columns={columns}
                            rowCount={data?.count}
                            getRowId={(job) => job._id as string}
                            pagination
                            paginationMode="server"
                            paginationModel={paginationModel}
                            onPaginationModelChange={
                                handlePaginationModelChange
                            }
                            pageSizeOptions={[10, 25, 50]}
                            disableRowSelectionOnClick
                            disableColumnResize
                            hideFooterSelectedRowCount
                            loading={isPending || isFetching}
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
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
