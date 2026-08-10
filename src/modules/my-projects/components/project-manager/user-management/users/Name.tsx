import React from "react";
import { Chip, Stack, Typography } from "@mui/material";

import type {
    MyProject,
    ProjectManagementUser,
} from "../../../../types/project.ts";

export default function Name({
    user,
    project,
}: {
    user: ProjectManagementUser;
    project: MyProject;
}): React.ReactElement {
    const personOid = user.person_id;
    const isPI =
        personOid !== null && personOid === project.principal_investigator_id;
    const isPC =
        personOid !== null && personOid === project.person_of_contact_id;

    return (
        <Stack
            direction="row"
            spacing={0.75}
            sx={{ alignItems: "center", minWidth: 0 }}
        >
            <Typography variant="body2" noWrap>
                {[user.title, user.firstname, user.lastname]
                    .filter(Boolean)
                    .join(" ")}
            </Typography>
            {isPI ? <Chip label="PI" size="small" color="primary" /> : null}
            {isPC ? <Chip label="PC" size="small" color="secondary" /> : null}
        </Stack>
    );
}
