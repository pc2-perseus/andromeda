import React from "react";
import { BarPlot } from "@mui/x-charts/BarChart";
import {
    ChartsAxisHighlight,
    ChartsContainer,
    ChartsLegend,
    ChartsTooltip,
    ChartsXAxis,
    ChartsYAxis,
} from "@mui/x-charts";
import { LinePlot } from "@mui/x-charts/LineChart";
import type { Resource } from "../../../../../types/perseus/Resource.ts";

function formatResourceValue(
    value: number | null,
    resource: Resource
): string | null {
    if (value === null) {
        return null;
    }

    const unit = resource.display_unit ? ` ${resource.display_unit}` : "";
    return `${value.toLocaleString()}${unit}`;
}

export default function UsageChartPlot({
    dataset,
    chartResources,
    resourceLegendLabelById,
    resourceColorById,
    resourcesWithPhaseAverage,
}: {
    dataset: { [key: string]: number | string | null }[];
    chartResources: Resource[];
    resourceLegendLabelById: Map<string, string>;
    resourceColorById: Map<string, string>;
    resourcesWithPhaseAverage: Set<string>;
}): React.ReactElement {
    return (
        <ChartsContainer
            dataset={dataset}
            height={500}
            xAxis={[
                {
                    id: "days",
                    dataKey: "label",
                    scaleType: "band",
                    categoryGapRatio: 0.35,
                },
            ]}
            yAxis={[
                {
                    id: "usage",
                },
            ]}
            series={[
                ...chartResources.map((resource) => ({
                    id: resource.id,
                    type: "bar" as const,
                    dataKey: resource.id,
                    yAxisId: "usage",
                    label:
                        resourceLegendLabelById.get(resource.id) ??
                        resource.name,
                    color: resourceColorById.get(resource.id),
                    valueFormatter: (value: number | null) =>
                        formatResourceValue(value, resource),
                })),
                ...chartResources
                    .filter((resource) =>
                        resourcesWithPhaseAverage.has(resource.id)
                    )
                    .map((resource) => ({
                        id: `${resource.id}-max`,
                        type: "line" as const,
                        dataKey: `${resource.id}__max`,
                        yAxisId: "usage",
                        label: `Average daily limit for ${
                            resourceLegendLabelById.get(resource.id) ??
                            resource.name
                        }`,
                        color: resourceColorById.get(resource.id),
                        showMark: false,
                        valueFormatter: (value: number | null) =>
                            formatResourceValue(value, resource),
                    })),
            ]}
            sx={{
                "& .MuiLineElement-root": {
                    strokeDasharray: "6 4",
                    strokeWidth: 2,
                },
            }}
        >
            <ChartsYAxis />
            <ChartsXAxis />
            <ChartsAxisHighlight x="band" />
            <BarPlot />
            <LinePlot />
            <ChartsLegend />
            <ChartsTooltip trigger="axis" />
        </ChartsContainer>
    );
}
