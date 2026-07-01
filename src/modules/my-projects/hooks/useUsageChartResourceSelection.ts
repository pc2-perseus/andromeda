import { useEffect, useMemo, useRef, useState } from "react";
import type { Resource } from "../../../types/perseus/Resource.ts";
import type { GroupedCumulativeResource } from "./useGroupedCumulativeResources.ts";

export default function useUsageChartResourceSelection({
    resources,
    groupedResources,
}: {
    resources: Resource[];
    groupedResources: GroupedCumulativeResource[];
}) {
    const [selectedResources, setSelectedResources] = useState(resources);
    const hasInitializedSelection = useRef(false);

    const orderedResources = useMemo(
        () => groupedResources.flatMap((cluster) => cluster.resources),
        [groupedResources]
    );
    const defaultSelection = useMemo(
        () => (orderedResources.length > 0 ? orderedResources : resources),
        [orderedResources, resources]
    );

    useEffect(() => {
        if (hasInitializedSelection.current || defaultSelection.length === 0) {
            return;
        }

        setSelectedResources(defaultSelection);
        hasInitializedSelection.current = true;
    }, [defaultSelection]);

    const selectedResourceById = useMemo(
        () =>
            Object.fromEntries(
                selectedResources.map((resource) => [resource.id, true])
            ) as Record<string, boolean>,
        [selectedResources]
    );

    function handleToggleResource(resourceId: string) {
        setSelectedResources((prev) => {
            const isSelected = prev.some(
                (resource) => resource.id === resourceId
            );

            if (isSelected) {
                return prev.filter((resource) => resource.id !== resourceId);
            }

            const resourceToAdd = resources.find(
                (resource) => resource.id === resourceId
            );
            return resourceToAdd ? [...prev, resourceToAdd] : prev;
        });
    }

    function handleToggleCluster(clusterId: string) {
        const cluster = groupedResources.find(
            (group) => group.id === clusterId
        );
        if (!cluster) {
            return;
        }

        setSelectedResources((prev) => {
            const selectedIds = new Set(prev.map((resource) => resource.id));
            const allSelected = cluster.resources.every((resource) =>
                selectedIds.has(resource.id)
            );

            if (allSelected) {
                return prev.filter(
                    (resource) => resource.cluster_id !== clusterId
                );
            }

            const selectedById = new Map(
                prev.map((resource) => [resource.id, resource])
            );
            cluster.resources.forEach((resource) => {
                selectedById.set(resource.id, resource);
            });

            return orderedResources.filter((resource) =>
                selectedById.has(resource.id)
            );
        });
    }

    function resetSelectedResources() {
        setSelectedResources(defaultSelection);
    }

    return {
        selectedResources,
        selectedResourceById,
        handleToggleResource,
        handleToggleCluster,
        resetSelectedResources,
    };
}
