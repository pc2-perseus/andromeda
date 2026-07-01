// React imports
import React from "react";

// MUI imports
import { Box, Divider, Typography } from "@mui/material";

// Custom imports
import type { Cluster } from "../../../../../types/perseus/Cluster.ts";
import getItemName from "../../../functions/getItemName.ts";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import ClusterSwitch from "./ClusterSwitch.tsx";
import Resources from "./Resources.tsx";

export default function SecCluster({
    cluster,
}: {
    cluster: Cluster;
}): React.ReactElement | null {
    const config = useModuleConfig();

    if (!config) {
        return null;
    }

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h4">
                    {getItemName(cluster, config.alternative_names)}
                </Typography>
                <ClusterSwitch cluster={cluster} />
            </Box>
            <Resources cluster={cluster} />
            <Divider />
        </>
    );
}
