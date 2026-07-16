import React from "react";
import type { ResourceValue } from "../../../../../types/perseus/ResourceValue.ts";
import type { ClusterResourceGroup } from "../../../hooks/useClusterResourceGroups.ts";

type ClusterResourcesContextValue = {
    cumulativeClusters: ClusterResourceGroup[];
    snapshotClusters: ClusterResourceGroup[];
    grantedResources: ResourceValue[];
    computeProjectId: string;
    dangerThresholdPercent: number;
};

const ClusterResourcesContext =
    React.createContext<ClusterResourcesContextValue | null>(null);

export function ClusterResourcesProvider({
    children,
    value,
}: {
    children: React.ReactNode;
    value: ClusterResourcesContextValue;
}): React.ReactElement {
    return (
        <ClusterResourcesContext.Provider value={value}>
            {children}
        </ClusterResourcesContext.Provider>
    );
}

export function useClusterResources(): ClusterResourcesContextValue {
    const context = React.useContext(ClusterResourcesContext);

    if (!context) {
        throw new Error(
            "useClusterResources must be used within ClusterResourcesProvider"
        );
    }

    return context;
}
