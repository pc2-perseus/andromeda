import { useState } from "react";
import type { Resource } from "../../../types/perseus/Resource.ts";
import type { ResourceUsage } from "../../../types/perseus/ResourceUsage.ts";
import type { GroupedCumulativeResource } from "./useGroupedCumulativeResources.ts";
import useUsageChartRange, {
    DEFAULT_USAGE_RANGE,
    type UsageRange,
} from "./useUsageChartRange.ts";
import useUsageChartResourceSelection from "./useUsageChartResourceSelection.ts";
import useUsageChartUserFilter from "./useUsageChartUserFilter.ts";

export type { UsageRange } from "./useUsageChartRange.ts";

export default function useUsageChartFilters({
    usage,
    resources,
    groupedResources,
    projectEnd,
    enableUserFilter,
}: {
    usage: ResourceUsage[];
    resources: Resource[];
    groupedResources: GroupedCumulativeResource[];
    projectEnd: Date | null;
    enableUserFilter: boolean;
}) {
    const [requestedRange, setSelectedRange] =
        useState<UsageRange>(DEFAULT_USAGE_RANGE);
    const [showFilters, setShowFilters] = useState(false);
    const { users, selectedUser, setSelectedUser } = useUsageChartUserFilter({
        usage,
        enableUserFilter,
    });

    const {
        filterEndDate,
        filterStartDate,
        availableRangeOptions,
        defaultRange,
    } = useUsageChartRange({
        usage,
        projectEnd,
        selectedRange: requestedRange,
    });
    const selectedRange = availableRangeOptions.some(
        (item) => item.value === requestedRange
    )
        ? requestedRange
        : "all-time";

    const {
        selectedResources,
        selectedResourceById,
        handleToggleResource,
        handleToggleCluster,
        resetSelectedResources,
    } = useUsageChartResourceSelection({
        resources,
        groupedResources,
    });

    function resetFilters() {
        resetSelectedResources();
        setSelectedRange(defaultRange);
        setSelectedUser(null);
    }

    return {
        selectedResources,
        selectedRange,
        selectedUser,
        showFilters,
        users,
        availableRangeOptions,
        filterStartDate,
        filterEndDate,
        selectedResourceById,
        setSelectedRange,
        setSelectedUser,
        toggleShowFilters: () => setShowFilters((prev) => !prev),
        resetFilters,
        handleToggleResource,
        handleToggleCluster,
    };
}
