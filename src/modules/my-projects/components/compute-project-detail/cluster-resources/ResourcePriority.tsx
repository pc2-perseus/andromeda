import React from "react";
import { Chip } from "@mui/material";
import useCurrentResourcePriority from "../../../hooks/useCurrentResourcePriority.ts";
import { useClusterResources } from "./ClusterResourcesContext.tsx";

export default function ResourcePriority({
    resourceId,
}: {
    resourceId: string;
}): React.ReactElement {
    const { grantedResources, computeProjectId } = useClusterResources();
    const priority = useCurrentResourcePriority({
        grantedResources,
        resourceId,
        computeProjectId,
    });

    return (
        <Chip
            size="small"
            label={priority.label}
            sx={
                priority.color
                    ? {
                          bgcolor: priority.color,
                          borderColor: priority.color,
                          color: priority.textColor ?? "common.white",
                      }
                    : undefined
            }
        />
    );
}
