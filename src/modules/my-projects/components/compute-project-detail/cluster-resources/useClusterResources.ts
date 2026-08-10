import React from "react";
import {
    ClusterResourcesContext,
    type ClusterResourcesContextValue,
} from "./clusterResourcesContextValue.ts";

export default function useClusterResources(): ClusterResourcesContextValue {
    const context = React.useContext(ClusterResourcesContext);

    if (!context) {
        throw new Error(
            "useClusterResources must be used within ClusterResourcesProvider"
        );
    }

    return context;
}
