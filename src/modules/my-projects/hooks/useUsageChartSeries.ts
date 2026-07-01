import { useMemo } from "react";
import dayjs from "dayjs";
import type { Resource } from "../../../types/perseus/Resource.ts";
import type { ResourceUsage } from "../../../types/perseus/ResourceUsage.ts";
import type { GroupedCumulativeResource } from "./useGroupedCumulativeResources.ts";

function colorFromResourceId(resourceId: string): string {
    let hash = 0;
    for (let i = 0; i < resourceId.length; i++) {
        hash = (hash << 5) - hash + resourceId.charCodeAt(i);
        hash |= 0;
    }

    const hue = Math.abs(hash) % 360;
    return `hsl(${hue} 70% 45%)`;
}

function colorFromResource(resourceId: string, resourceName: string): string {
    const normalizedName = resourceName.toLowerCase();

    if (normalizedName.includes("gpu")) {
        return "#2e7d32";
    }
    if (normalizedName.includes("cpu")) {
        return "#1565c0";
    }
    if (normalizedName.includes("fpga")) {
        return "#ef6c00";
    }

    return colorFromResourceId(resourceId);
}

export default function useUsageChartSeries({
    usage,
    groupedResources,
    selectedResources,
    selectedUser,
    filterStartDate,
    filterEndDate,
}: {
    usage: ResourceUsage[];
    groupedResources: GroupedCumulativeResource[];
    selectedResources: Resource[];
    selectedUser: string | null;
    filterStartDate: Date | null;
    filterEndDate: Date | null;
}) {
    const orderedResources = useMemo(
        () => groupedResources.flatMap((cluster) => cluster.resources),
        [groupedResources]
    );
    const resourceLegendLabelById = useMemo(() => {
        const labels = new Map<string, string>();
        groupedResources.forEach((cluster) => {
            cluster.resources.forEach((resource) => {
                labels.set(resource.id, `${cluster.name}: ${resource.name}`);
            });
        });
        return labels;
    }, [groupedResources]);
    const resourceColorById = useMemo(() => {
        const colors = new Map<string, string>();
        orderedResources.forEach((resource) => {
            colors.set(
                resource.id,
                colorFromResource(resource.id, resource.name)
            );
        });
        return colors;
    }, [orderedResources]);
    const resourcesWithEntries = useMemo(() => {
        const selectedResourceIds = new Set(
            selectedResources.map((resource) => resource.id)
        );

        return new Set(
            usage
                .filter((item) => {
                    if (!selectedResourceIds.has(item.resource_id)) {
                        return false;
                    }

                    if (selectedUser !== null && item.user !== selectedUser) {
                        return false;
                    }

                    const date = dayjs.utc(item.end);
                    if (
                        filterStartDate &&
                        date.isBefore(dayjs.utc(filterStartDate))
                    ) {
                        return false;
                    }
                    if (
                        filterEndDate &&
                        date.isAfter(dayjs.utc(filterEndDate))
                    ) {
                        return false;
                    }

                    return true;
                })
                .map((item) => item.resource_id)
        );
    }, [
        usage,
        selectedResources,
        selectedUser,
        filterStartDate,
        filterEndDate,
    ]);

    const chartResources = useMemo(
        () =>
            orderedResources.filter((resource) =>
                resourcesWithEntries.has(resource.id)
            ),
        [orderedResources, resourcesWithEntries]
    );

    return {
        chartResources,
        resourceLegendLabelById,
        resourceColorById,
    };
}
