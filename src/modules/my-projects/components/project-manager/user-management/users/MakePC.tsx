import React from "react";
import { Button, Tooltip } from "@mui/material";

import useMakePCMutation from "../../../../hooks/useMakePCMutation.ts";
import type {
    MyProject,
    ProjectManagementUser,
} from "../../../../types/project.ts";
import AutoHideSnackbar from "../AutoHideSnackbar.tsx";

export default function MakePC({
    user,
    project,
}: {
    user: ProjectManagementUser;
    project: MyProject;
}): React.ReactElement {
    const {
        isError,
        isPending,
        isSuccess,
        mutateAsync: makePC,
    } = useMakePCMutation(project._id as string);
    const personOid = user.person_id;
    const isPC =
        personOid !== null && personOid === project.person_of_contact_id;

    return (
        <>
            {isSuccess ? (
                <AutoHideSnackbar severity="success">
                    Person of contact was updated.
                </AutoHideSnackbar>
            ) : null}
            {isError ? (
                <AutoHideSnackbar severity="error">
                    The person of contact could not be updated.
                </AutoHideSnackbar>
            ) : null}
            <Tooltip title="Make person of contact">
                <span>
                    <Button
                        variant="outlined"
                        size="small"
                        color="secondary"
                        disabled={isPending || isPC}
                        onClick={() => {
                            void makePC({
                                personOid: user.person_id,
                            }).catch(() => undefined);
                        }}
                    >
                        Make PC
                    </Button>
                </span>
            </Tooltip>
        </>
    );
}
