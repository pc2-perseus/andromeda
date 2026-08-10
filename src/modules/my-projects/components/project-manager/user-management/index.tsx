import React from "react";
import { Stack } from "@mui/material";

import type { MyProject } from "../../../types/project.ts";
import InvitesTable from "./invites";
import UsersTable from "./users";

export default function UserManagement({
    project,
}: {
    project: MyProject;
}): React.ReactElement {
    return (
        <Stack spacing={2}>
            <UsersTable project={project} />
            <InvitesTable project={project} />
        </Stack>
    );
}
