import React from "react";
import { Chip } from "@mui/material";
import type { ResourceValue } from "../../../../../types/perseus/ResourceValue.ts";
import useCurrentResourcePriority from "../../../hooks/useCurrentResourcePriority.ts";

export default function ResourcePriority({
    grantedResources,
    resourceId,
    computeProjectId,
}: {
    grantedResources: ResourceValue[];
    resourceId: string;
    computeProjectId: string;
}): React.ReactElement {
    const priority = useCurrentResourcePriority({
        grantedResources,
        resourceId,
        computeProjectId,
    });

    return <Chip size="small" label={`${priority} priority`} />;
}
