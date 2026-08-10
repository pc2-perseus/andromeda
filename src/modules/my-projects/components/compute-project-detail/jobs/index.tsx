import React from "react";
import { Alert, Box, Stack } from "@mui/material";
import { DataGrid, type GridPaginationModel } from "@mui/x-data-grid";
import type { Job } from "../../../../../types/perseus/Job.ts";
import useIsPIorPC from "../../../hooks/useIsPIorPC.ts";
import useJobsQuery from "../../../hooks/useJobsQuery.ts";
import type { MyProject } from "../../../types/project.ts";
import DetailDialog from "./dialog/index.tsx";
import Empty from "./Empty.tsx";
import GroupJobsDialog from "./GroupJobsDialog.tsx";
import { createJobColumns } from "./columns.tsx";

const DEFAULT_ROWS_PER_PAGE = 10;

export default function JobTable({
    project,
    computeProjectId,
}: {
    project: MyProject;
    computeProjectId: string;
}): React.ReactElement {
    const showUserColumn = useIsPIorPC(project);
    const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
    const [selectedGroupJob, setSelectedGroupJob] = React.useState<Job | null>(
        null
    );
    const [selectedGroupDetailJob, setSelectedGroupDetailJob] =
        React.useState<Job | null>(null);

    const [paginationModel, setPaginationModel] =
        React.useState<GridPaginationModel>({
            page: 0,
            pageSize: DEFAULT_ROWS_PER_PAGE,
        });

    const { data, isPending, isFetching, isError } = useJobsQuery({
        projectOid: project._id as string,
        computeProjectId: computeProjectId,
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
    });

    const columns = React.useMemo(
        () =>
            createJobColumns({
                showUserColumn,
                onOpenJobDetails: setSelectedJob,
                onOpenGroupDetails: setSelectedGroupJob,
            }),
        [showUserColumn]
    );

    return (
        <Stack spacing={2}>
            {isError && (
                <Alert severity="error">
                    There was an error loading the project jobs
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
                    rowCount={data?.count ?? -1}
                    getRowId={(job) => job._id as string}
                    pagination
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
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

            <DetailDialog
                job={selectedJob}
                open={selectedJob !== null}
                onClose={() => setSelectedJob(null)}
            />

            <GroupJobsDialog
                project={project}
                computeProjectId={computeProjectId}
                groupJob={selectedGroupJob}
                open={selectedGroupJob !== null}
                onClose={() => setSelectedGroupJob(null)}
                onOpenJobDetails={setSelectedGroupDetailJob}
            />

            <DetailDialog
                job={selectedGroupDetailJob}
                open={selectedGroupDetailJob !== null}
                onClose={() => setSelectedGroupDetailJob(null)}
            />
        </Stack>
    );
}
