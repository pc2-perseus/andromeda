import React from "react";
import { Alert, Stack, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import useUsersQuery from "../../../../hooks/useUsersQuery.ts";
import type {
    MyProject,
    ProjectManagementUser,
} from "../../../../types/project.ts";
import ComputeProjectChips from "./ComputeProjectChips.tsx";
import DataGridShell from "../DataGridShell.tsx";
import MakePC from "./MakePC.tsx";
import Name from "./Name.tsx";

export default function UsersTable({
    project,
}: {
    project: MyProject;
}): React.ReactElement {
    const projectOid = project._id as string;
    const { data: users = [], isError, isPending } = useUsersQuery(projectOid);

    const columns = React.useMemo<GridColDef<ProjectManagementUser>[]>(
        () => [
            {
                field: "name",
                headerName: "Full name",
                minWidth: 260,
                flex: 1,
                valueGetter: (_, user) =>
                    [user.title, user.firstname, user.lastname]
                        .filter(Boolean)
                        .join(" "),
                renderCell: (params) => (
                    <Name user={params.row} project={project} />
                ),
            },
            {
                field: "username",
                headerName: "Username",
                minWidth: 160,
                flex: 0.8,
                valueFormatter: (value) => value ?? "-",
            },
            {
                field: "email",
                headerName: "Email",
                minWidth: 240,
                flex: 1.1,
            },
            {
                field: "compute_project_ids",
                headerName: "Compute projects",
                minWidth: 360,
                flex: 1.4,
                sortable: false,
                renderCell: (params) => (
                    <ComputeProjectChips user={params.row} project={project} />
                ),
            },
            {
                field: "actions",
                headerName: "Actions",
                minWidth: 150,
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                renderCell: (params) => (
                    <MakePC user={params.row} project={project} />
                ),
            },
        ],
        [project]
    );

    return (
        <Stack spacing={1}>
            <Typography variant="h6" component="h2">
                Users
            </Typography>
            {isError ? (
                <Alert severity="error">
                    There was an error loading project users.
                </Alert>
            ) : null}
            <DataGridShell>
                <DataGrid
                    autoHeight
                    rows={users}
                    columns={columns}
                    getRowId={(row) => row.person_id}
                    loading={isPending}
                    pageSizeOptions={[10, 25, 50]}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10 },
                        },
                    }}
                    disableRowSelectionOnClick
                    disableColumnResize
                    hideFooterSelectedRowCount
                    slotProps={{
                        loadingOverlay: {
                            variant: "skeleton",
                            noRowsVariant: "skeleton",
                        },
                    }}
                />
            </DataGridShell>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                To add or remove users from compute projects, click on the
                compute project name.
            </Typography>
        </Stack>
    );
}
