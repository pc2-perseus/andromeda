import React from "react";
import dayjs from "dayjs";
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
    return `${value.toLocaleString("en-US")}${unit}`;
}

function getXAxisLabelInterval(datasetSize: number): number {
    if (datasetSize <= 16) {
        return 2;
    }

    if (datasetSize <= 45) {
        return 4;
    }

    if (datasetSize <= 120) {
        return 7;
    }

    return Math.ceil(datasetSize / 12);
}

function formatXAxisLabel(value: string, datasetSize: number): string {
    if (datasetSize <= 120) {
        const date = dayjs.utc(value, "DD.MM.YY");
        return date.isValid() ? date.format("DD.MM") : value;
    }

    const date = dayjs.utc(value, "DD.MM.YY");
    return date.isValid() ? date.format("MMM YY") : value;
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
    const xAxisLabelInterval = getXAxisLabelInterval(dataset.length);

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
                    tickLabelInterval: (_, index) =>
                        index % xAxisLabelInterval === 0 ||
                        index === dataset.length - 1,
                    valueFormatter: (value: string) =>
                        formatXAxisLabel(value, dataset.length),
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
                "& .MuiLineChart-line": {
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
