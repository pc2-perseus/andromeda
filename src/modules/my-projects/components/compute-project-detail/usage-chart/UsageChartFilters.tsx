import React from "react";
import { Stack } from "@mui/material";
import type { GroupedCumulativeResource } from "../../../hooks/useGroupedCumulativeResources.ts";
import type { UsageRange } from "../../../hooks/useUsageChartRange.ts";
import FilterHeader from "./filters/FilterHeader.tsx";
import SelectFilters from "./filters/SelectFilters.tsx";
import ClusterResourceSwitches from "./filters/ClusterResourceSwitches.tsx";

export default function UsageChartFilters({
    showFilters,
    toggleShowFilters,
    resetFilters,
    availableRangeOptions,
    selectedRange,
    setSelectedRange,
    showUserFilter,
    selectedUser,
    setSelectedUser,
    users,
    groupedResources,
    selectedResourceById,
    resourceColorById,
    handleToggleResource,
    handleToggleCluster,
}: {
    showFilters: boolean;
    toggleShowFilters: () => void;
    resetFilters: () => void;
    availableRangeOptions: { value: UsageRange; label: string }[];
    selectedRange: UsageRange;
    setSelectedRange: (value: UsageRange) => void;
    showUserFilter: boolean;
    selectedUser: string | null;
    setSelectedUser: (value: string | null) => void;
    users: string[];
    groupedResources: GroupedCumulativeResource[];
    selectedResourceById: Record<string, boolean>;
    resourceColorById: Map<string, string>;
    handleToggleResource: (resourceId: string) => void;
    handleToggleCluster: (clusterId: string) => void;
}): React.ReactElement {
    return (
        <>
            <FilterHeader
                showFilters={showFilters}
                toggleShowFilters={toggleShowFilters}
                resetFilters={resetFilters}
            />

            {showFilters ? (
                <Stack spacing={2}>
                    <SelectFilters
                        availableRangeOptions={availableRangeOptions}
                        selectedRange={selectedRange}
                        setSelectedRange={setSelectedRange}
                        showUserFilter={showUserFilter}
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                        users={users}
                    />
                    <ClusterResourceSwitches
                        groupedResources={groupedResources}
                        selectedResourceById={selectedResourceById}
                        resourceColorById={resourceColorById}
                        handleToggleResource={handleToggleResource}
                        handleToggleCluster={handleToggleCluster}
                    />
                </Stack>
            ) : null}
        </>
    );
}
