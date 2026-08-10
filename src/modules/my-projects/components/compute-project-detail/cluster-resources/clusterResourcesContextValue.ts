import React from "react";
import type { ResourceValue } from "../../../../../types/perseus/ResourceValue.ts";
import type { ClusterResourceGroup } from "../../../hooks/useClusterResourceGroups.ts";

export type ClusterResourcesContextValue = {
    cumulativeClusters: ClusterResourceGroup[];
    snapshotClusters: ClusterResourceGroup[];
    grantedResources: ResourceValue[];
    computeProjectId: string;
    dangerThresholdPercent: number;
};

export const ClusterResourcesContext =
    React.createContext<ClusterResourcesContextValue | null>(null);
