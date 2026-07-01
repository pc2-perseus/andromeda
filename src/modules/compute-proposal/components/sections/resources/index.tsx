// React imports
import React from "react";

// MUI imports
import { Typography } from "@mui/material";

// Custom imports
import Clusters from "./Clusters.tsx";
import StorageRequirements from "./StorageRequirements.tsx";
import StorageRequirementsExplanation from "./StorageRequirementsExplanation.tsx";
import Limits from "./Limits.tsx";

export default function SecResources(): React.ReactElement | null {
    return (
        <>
            <Typography variant="h2">Resources</Typography>
            <Clusters />
            <StorageRequirements />
            <StorageRequirementsExplanation />
            <Limits />
        </>
    );
}
