// React imports
import React from "react";

// MUI imports
import { Box } from "@mui/material";

// Custom imports
import type { Cluster } from "../../../../../types/perseus/Cluster.ts";
import useSortedResources from "../../../hooks/useSortedResources.ts";
import type { Resource } from "../../../../../types/perseus/Resource.ts";
import ResourceInput from "./Resource.tsx";
import useClusterIsSelected from "../../../hooks/useClusterIsSelected.ts";

export default function Resources({
    cluster,
}: {
    cluster: Cluster;
}): React.ReactElement | null {
    const [selected] = useClusterIsSelected(cluster);
    const sortedResources = useSortedResources(cluster);

    if (!selected) {
        return null;
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {sortedResources.map((resource: Resource) => {
                return <ResourceInput key={resource.id} resource={resource} />;
            })}
        </Box>
    );
}
