import React from "react";
import { Chip } from "@mui/material";
import useClusterMap from "../../../hooks/useClusterMap.ts";

export default function ClusterChip({
    clusterId,
}: {
    clusterId: string;
}): React.ReactElement {
    const clusterMap = useClusterMap();
    const label = clusterMap.get(clusterId)?.name ?? clusterId;

    return <Chip label={label} size="small" variant="outlined" />;
}
