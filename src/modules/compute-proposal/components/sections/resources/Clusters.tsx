// React imports
import React from "react";

// MUI imports
import { Typography } from "@mui/material";

// Custom imports
import type { Cluster } from "../../../../../types/perseus/Cluster.ts";
import ClusterEdit from "./Cluster.tsx";
import useShowResourceTab from "../../../hooks/useShowResourceTab.ts";
import useSelectableClusters from "../../../hooks/useSelectableClusters.ts";

export default function Clusters(): React.ReactElement {
    const showResources = useShowResourceTab();
    const clusters: Cluster[] = useSelectableClusters();

    if (typeof showResources === "string") {
        return <i>{showResources}</i>;
    }

    return (
        <>
            <Typography>
                Please select which clusters and resources you want to access.
            </Typography>
            {clusters.map((cluster: Cluster) => (
                <ClusterEdit key={cluster.id} cluster={cluster} />
            ))}
        </>
    );
}
