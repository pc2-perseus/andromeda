import { useMemo } from "react";
import useCumulativeResources from "./useCumulativeResources.ts";
import useClusterMap from "./useClusterMap.ts";
import type { Resource } from "../../../types/perseus/Resource.ts";

function resourcePriority(resourceName: string): number {
    const normalizedName = resourceName.toLowerCase();

    if (normalizedName.includes("cpu")) {
        return 0;
    }
    if (normalizedName.includes("gpu")) {
        return 1;
    }
    if (normalizedName.includes("fpga")) {
        return 2;
    }

    return 3;
}

function compareResources(left: Resource, right: Resource): number {
    const priorityDiff =
        resourcePriority(left.name) - resourcePriority(right.name);
    if (priorityDiff !== 0) {
        return priorityDiff;
    }

    return left.name.localeCompare(right.name);
}

export type GroupedCumulativeResource = {
    id: string;
    name: string;
    resources: Resource[];
};

export default function useGroupedCumulativeResources(
    providedResources?: Resource[]
) {
    const clusterMap = useClusterMap();
    const cumulativeResources = useCumulativeResources();
    const resources = providedResources ?? cumulativeResources;

    return useMemo(() => {
        const resourcesByCluster = new Map<string, typeof resources>();
        resources.forEach((resource) => {
            const current = resourcesByCluster.get(resource.cluster_id) ?? [];
            current.push(resource);
            resourcesByCluster.set(resource.cluster_id, current);
        });

        return [...resourcesByCluster.entries()]
            .map(([clusterId, clusterResources]) => ({
                id: clusterId,
                name: clusterMap.get(clusterId)?.name ?? clusterId,
                resources: [...clusterResources].sort(compareResources),
            }))
            .sort((left, right) => left.name.localeCompare(right.name));
    }, [resources, clusterMap]) as GroupedCumulativeResource[];
}
