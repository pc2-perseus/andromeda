import React from "react";
import { Chip, Skeleton } from "@mui/material";
import useCurrentResourcePriority from "../../../hooks/useCurrentResourcePriority.ts";
import useClusterResources from "./useClusterResources.ts";
import useResourcePrioritiesQuery from "../../../hooks/useResourcePrioritiesQuery.ts";

export default function ResourcePriority({
    resourceId,
}: {
    resourceId: string;
}): React.ReactElement {
    const { isPending } = useResourcePrioritiesQuery();
    const { grantedResources, computeProjectId } = useClusterResources();
    const priority = useCurrentResourcePriority({
        grantedResources,
        resourceId,
        computeProjectId,
    });

    return (
        <Chip
            size="small"
            label={
                isPending ? (
                    <Skeleton width={50} />
                ) : (
                    (priority?.priority_id ?? "unknown")
                )
            }
            sx={
                priority?.indicator_color
                    ? {
                          bgcolor: priority.indicator_color,
                          borderColor: priority.indicator_color,
                          color: "common.white",
                      }
                    : undefined
            }
        />
    );
}
