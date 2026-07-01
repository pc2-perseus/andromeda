import React from "react";
import { Alert, Stack, type StackProps } from "@mui/material";
import type { MyProject } from "../../../types/project.ts";
import type { ComputeProject } from "../../../../../types/perseus/ComputeProject.ts";
import useUsage from "../../../hooks/useUsage.ts";
import useUsedContingents from "../../../hooks/useUsedContingents.ts";
import useUsageChartData from "../../../hooks/useUsageChartData.ts";
import useCumulativeResources from "../../../hooks/useCumulativeResources.ts";
import useGroupedCumulativeResources from "../../../hooks/useGroupedCumulativeResources.ts";
import useUsageChartFilters from "../../../hooks/useUsageChartFilters.ts";
import useUsageChartSeries from "../../../hooks/useUsageChartSeries.ts";
import useUsageChartDatasetWithMax from "../../../hooks/useUsageChartDatasetWithMax.ts";
import UsageChartPlot from "./UsageChartPlot.tsx";
import UsageChartFilters from "./UsageChartFilters.tsx";
import UsageChartSkeleton from "./UsageChartSkeleton.tsx";

export default function UsageChart({
    project,
    computeProject,
    showUserFilter,
    ...props
}: {
    project: MyProject;
    computeProject: ComputeProject;
    showUserFilter: boolean;
} & StackProps): React.ReactElement {
    if (!project._id) {
        throw new Error("Project must have an ID");
    }

    const resources = useCumulativeResources();
    const groupedResources = useGroupedCumulativeResources();
    const { usage, loading, error } = useUsage(
        project._id,
        computeProject.compute_project_id
    );
    const { usedContingents } = useUsedContingents(
        project._id,
        computeProject.compute_project_id
    );

    const {
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
        toggleShowFilters,
        resetFilters,
        handleToggleResource,
        handleToggleCluster,
    } = useUsageChartFilters({
        usage,
        resources,
        groupedResources,
        projectEnd: project.end,
        enableUserFilter: showUserFilter,
    });

    const { chartResources, resourceLegendLabelById, resourceColorById } =
        useUsageChartSeries({
            usage,
            groupedResources,
            selectedResources,
            selectedUser,
            filterStartDate,
            filterEndDate,
        });

    const dataset = useUsageChartData(usage, {
        selectedResources,
        min: filterStartDate,
        max: filterEndDate,
        selectedUser,
    });
    const { datasetWithMax, resourcesWithPhaseAverage } =
        useUsageChartDatasetWithMax({
            dataset,
            chartResources,
            usedContingents,
            resources,
        });

    if (loading) {
        return <UsageChartSkeleton {...props} />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (resources.length === 0) {
        return <Alert severity="info">No cumulative resources found.</Alert>;
    }

    return (
        <Stack spacing={2} {...props}>
            <UsageChartPlot
                dataset={datasetWithMax}
                chartResources={chartResources}
                resourceLegendLabelById={resourceLegendLabelById}
                resourceColorById={resourceColorById}
                resourcesWithPhaseAverage={resourcesWithPhaseAverage}
            />
            <UsageChartFilters
                showFilters={showFilters}
                toggleShowFilters={toggleShowFilters}
                resetFilters={resetFilters}
                availableRangeOptions={availableRangeOptions}
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
                showUserFilter={showUserFilter}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                users={users}
                groupedResources={groupedResources}
                selectedResourceById={selectedResourceById}
                resourceColorById={resourceColorById}
                handleToggleResource={handleToggleResource}
                handleToggleCluster={handleToggleCluster}
            />
        </Stack>
    );
}
