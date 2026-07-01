// React imports
import React from "react";

// MUI imports
import { Typography } from "@mui/material";

// Custom imports
import OtherInfo from "./OtherInfo.tsx";
import Role from "./Role.tsx";
import RoleEmail from "./RoleEmail.tsx";
import RequiredCheckboxes from "./RequiredCheckboxes.tsx";
import ActionButtons from "./ActionButtons.tsx";

export default function SecFinalize(): React.ReactElement | null {
    return (
        <>
            <Typography variant="h2">Finalize</Typography>
            <OtherInfo />
            <Role />
            <RoleEmail />
            <RequiredCheckboxes />
            <ActionButtons />
        </>
    );
}
