// React imports
import React from "react";

// MUI imports
import { Checkbox, FormControlLabel, Typography } from "@mui/material";

// Custom imports
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import Public from "./Public.tsx";
import Private from "./Private.tsx";
import usePublicApproval from "../../../hooks/usePublicApproval.ts";

export default function SecPublic(): React.ReactElement | null {
    const config = useModuleConfig();
    const [isPublic, setIsPublic] = usePublicApproval();

    if (!config) {
        return null;
    }

    return (
        <>
            <Typography variant="h2">Public information</Typography>
            <Typography>
                Please enter a version of your project's details which will be
                visible on our website. We require all projects to give us
                permission for displaying them publicly. If there are special
                circumstances that prevent publication, please uncheck the
                following checkbox and enter the reasons below.
            </Typography>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.currentTarget.checked)}
                    />
                }
                label="I accept that my project will be publicly visible"
            />
            {isPublic ? <Public /> : <Private />}
        </>
    );
}
