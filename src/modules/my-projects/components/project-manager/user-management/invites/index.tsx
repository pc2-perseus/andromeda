import React from "react";
import { Alert, Button, Stack, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import useInviteUserMutation from "../../../../hooks/useInviteUserMutation.ts";
import useInvitesQuery from "../../../../hooks/useInvitesQuery.ts";
import type { UserInvite } from "../../../../../../types/perseus/UserInvite.ts";
import AutoHideSnackbar from "../AutoHideSnackbar.tsx";
import DataGridShell from "../DataGridShell.tsx";
import InviteDialog from "./InviteDialog.tsx";
import type { MyProject } from "../../../../types/project.ts";

function formatDate(value: Date): string {
    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(value);
}

export default function InvitesTable({
    project,
}: {
    project: MyProject;
}): React.ReactElement {
    const {
        data: invites = [],
        isError,
        isPending,
    } = useInvitesQuery(project._id as string);
    const {
        isError: inviteIsError,
        isPending: inviteIsPending,
        isSuccess: inviteIsSuccess,
        mutateAsync: invite,
        variables: inviteVariables,
    } = useInviteUserMutation(project._id as string);
    const [inviteDialogOpen, setInviteDialogOpen] = React.useState(false);

    const inviteUser = React.useCallback(
        async (email: string, computeProjectId: string): Promise<void> => {
            await invite({
                computeProjectId,
                email,
            });
        },
        [invite]
    );

    const columns = React.useMemo<GridColDef<UserInvite>[]>(
        () => [
            {
                field: "email",
                headerName: "Email",
                minWidth: 260,
                flex: 1,
            },
            {
                field: "compute_project",
                headerName: "Compute project",
                minWidth: 220,
                flex: 0.8,
            },
            {
                field: "created",
                headerName: "Created",
                minWidth: 220,
                flex: 0.8,
                renderCell: (params) => formatDate(params.row.created),
            },
        ],
        []
    );

    return (
        <Stack spacing={1}>
            <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
                <Typography variant="h6" component="h2">
                    Ongoing invites
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => setInviteDialogOpen(true)}
                    disabled={project.compute_projects.length === 0}
                >
                    Invite user
                </Button>
            </Stack>

            {inviteIsSuccess ? (
                <AutoHideSnackbar severity="success">
                    {inviteVariables?.email} was invited or added to{" "}
                    {inviteVariables?.computeProjectId}.
                </AutoHideSnackbar>
            ) : null}

            {inviteIsError ? (
                <AutoHideSnackbar severity="error">
                    The invitation could not be created.
                </AutoHideSnackbar>
            ) : null}

            {isError ? (
                <Alert severity="error">
                    There was an error loading project invitations.
                </Alert>
            ) : null}

            <DataGridShell>
                <DataGrid
                    autoHeight
                    rows={invites}
                    columns={columns}
                    getRowId={(invite) => invite._id as string}
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

            <InviteDialog
                open={inviteDialogOpen}
                computeProjects={project.compute_projects}
                loading={inviteIsPending}
                onClose={() => setInviteDialogOpen(false)}
                onInvite={inviteUser}
            />
        </Stack>
    );
}
