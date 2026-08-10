import React from "react";
import { Chip, Stack, Tooltip, Typography } from "@mui/material";

import useAddUserMutation from "../../../../hooks/useAddUserMutation.ts";
import useRemoveUserMutation from "../../../../hooks/useRemoveUserMutation.ts";
import type {
    MyProject,
    ProjectManagementUser,
} from "../../../../types/project.ts";
import AutoHideSnackbar from "../AutoHideSnackbar.tsx";

export default function ComputeProjectChips({
    user,
    project,
}: {
    user: ProjectManagementUser;
    project: MyProject;
}): React.ReactElement {
    const projectOid = project._id as string;
    const {
        isError: addUserIsError,
        isPending: addUserIsPending,
        isSuccess: addUserIsSuccess,
        mutateAsync: addUser,
        variables: addUserVariables,
    } = useAddUserMutation(projectOid);
    const {
        isError: removeUserIsError,
        isPending: removeUserIsPending,
        isSuccess: removeUserIsSuccess,
        mutateAsync: removeUser,
        variables: removeUserVariables,
    } = useRemoveUserMutation(projectOid);
    const mutationPending = addUserIsPending || removeUserIsPending;

    if (project.compute_projects.length === 0) {
        return <Typography variant="body2">-</Typography>;
    }

    return (
        <>
            {addUserIsSuccess ? (
                <AutoHideSnackbar severity="success">
                    User was added to {addUserVariables?.computeProjectId}.
                </AutoHideSnackbar>
            ) : null}
            {removeUserIsSuccess ? (
                <AutoHideSnackbar severity="success">
                    User was removed from{" "}
                    {removeUserVariables?.computeProjectId}.
                </AutoHideSnackbar>
            ) : null}
            {addUserIsError ? (
                <AutoHideSnackbar severity="error">
                    The project membership could not be updated.
                </AutoHideSnackbar>
            ) : null}
            {removeUserIsError ? (
                <AutoHideSnackbar severity="error">
                    The project membership could not be updated.
                </AutoHideSnackbar>
            ) : null}
            <Stack direction="row" spacing={0.75} sx={{ flexWrap: "wrap" }}>
                {project.compute_projects.map((computeProject) => {
                    const computeProjectId = computeProject.compute_project_id;
                    const isMember =
                        user.compute_project_ids.includes(computeProjectId);

                    return (
                        <Tooltip
                            key={computeProjectId}
                            title={
                                isMember
                                    ? `Remove user from ${computeProjectId}`
                                    : `Add user to ${computeProjectId}`
                            }
                        >
                            <span>
                                <Chip
                                    label={computeProjectId}
                                    size="small"
                                    color={isMember ? "primary" : "default"}
                                    variant={isMember ? "filled" : "outlined"}
                                    clickable={!mutationPending}
                                    disabled={mutationPending}
                                    sx={
                                        isMember
                                            ? {
                                                  "&:hover": {
                                                      bgcolor: "error.light",
                                                      color: "error.contrastText",
                                                  },
                                              }
                                            : undefined
                                    }
                                    onClick={() => {
                                        void (
                                            isMember
                                                ? removeUser({
                                                      computeProjectId,
                                                      personId: user.person_id,
                                                  })
                                                : addUser({
                                                      computeProjectId,
                                                      personId: user.person_id,
                                                  })
                                        ).catch(() => undefined);
                                    }}
                                />
                            </span>
                        </Tooltip>
                    );
                })}
            </Stack>
        </>
    );
}
