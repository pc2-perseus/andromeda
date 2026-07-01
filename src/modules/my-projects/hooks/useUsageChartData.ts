import type { ResourceUsage } from "../../../types/perseus/ResourceUsage.ts";
import dayjs from "dayjs";
import useResourceMap from "./useResourceMap.ts";
import { useMemo } from "react";
import type { Resource } from "../../../types/perseus/Resource.ts";

export default function useUsageChartData(
    usage: ResourceUsage[],
    filter: {
        min: Date | null;
        max: Date | null;
        selectedResources: Resource[];
        selectedUser: string | null;
    }
) {
    const { selectedResources, min, max, selectedUser } = filter;
    const minDate = min ? dayjs.utc(min).startOf("day") : null;
    const maxDate = max ? dayjs.utc(max).endOf("day") : null;

    const selectedResourceById = useMemo(
        () => Object.fromEntries(selectedResources.map((r) => [r.id, r])),
        [selectedResources]
    );
    const resourceMap = useResourceMap();
    const relevantUsageDates = useMemo(() => {
        return usage
            .map((resourceUsageItem) => {
                const resource = resourceMap.get(resourceUsageItem.resource_id);
                if (!resource || resource.resource_type !== "cumulative") {
                    return null;
                }

                if (!selectedResourceById[resource.id]) {
                    return null;
                }

                if (
                    selectedUser !== null &&
                    resourceUsageItem.user !== selectedUser
                ) {
                    return null;
                }

                const date = dayjs.utc(resourceUsageItem.end);
                if (maxDate && date.isAfter(maxDate)) {
                    return null;
                }

                return date;
            })
            .filter((date): date is dayjs.Dayjs => date !== null);
    }, [usage, resourceMap, selectedResourceById, selectedUser, maxDate]);

    const dailyByResource = useMemo(() => {
        const result = new Map<string, Map<string, number>>();

        usage.forEach((resourceUsageItem) => {
            const resource = resourceMap.get(resourceUsageItem.resource_id);
            if (!resource || resource.resource_type !== "cumulative") {
                return;
            }

            if (!selectedResourceById[resource.id]) {
                return;
            }

            if (
                selectedUser !== null &&
                resourceUsageItem.user !== selectedUser
            ) {
                return;
            }

            const date = dayjs(resourceUsageItem.end);

            if ((minDate && date < minDate) || (maxDate && date > maxDate)) {
                return;
            }

            const key = date.format("DD.MM.YY");
            const perDay = result.get(key) ?? new Map<string, number>();
            const currentValue = perDay.get(resource.id) ?? 0;
            const normalizedValue =
                (resourceUsageItem.value *
                    resourceUsageItem.contingent_factor) /
                (resource.display_unit_factor || 1);
            perDay.set(resource.id, currentValue + normalizedValue);
            result.set(key, perDay);
        });

        return result;
    }, [
        usage,
        resourceMap,
        selectedResourceById,
        minDate,
        maxDate,
        selectedUser,
    ]);

    const days = useMemo(() => {
        const earliestRelevantDate =
            relevantUsageDates.length > 0
                ? relevantUsageDates.reduce((earliest, current) =>
                      current.isBefore(earliest) ? current : earliest
                  )
                : null;

        const latestRelevantDate =
            relevantUsageDates.length > 0
                ? relevantUsageDates.reduce((latest, current) =>
                      current.isAfter(latest) ? current : latest
                  )
                : null;

        const rangeStart =
            minDate ??
            earliestRelevantDate?.startOf("day") ??
            maxDate?.startOf("day") ??
            null;
        const rangeEnd =
            maxDate ??
            latestRelevantDate?.endOf("day") ??
            minDate?.endOf("day") ??
            null;

        if (!rangeStart || !rangeEnd || rangeStart.isAfter(rangeEnd)) {
            return [];
        }

        const result: string[] = [];
        let current = rangeStart.startOf("day");
        const end = rangeEnd.startOf("day");
        while (current.isBefore(end) || current.isSame(end)) {
            result.push(current.format("DD.MM.YY"));
            current = current.add(1, "day");
        }

        return result;
    }, [relevantUsageDates, minDate, maxDate]);

    return useMemo(
        () =>
            days.map((key) => {
                const point: { [key: string]: number | string } = {
                    day: key,
                    label: key,
                };

                const usageByResourceId = dailyByResource.get(key);
                resourceMap.forEach((resource) => {
                    point[resource.id] =
                        usageByResourceId?.get(resource.id) ?? 0;
                });

                return point;
            }),
        [dailyByResource, days, resourceMap]
    );
}
