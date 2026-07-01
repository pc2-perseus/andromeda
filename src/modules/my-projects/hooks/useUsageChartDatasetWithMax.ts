import { useMemo } from "react";
import dayjs from "dayjs";
import type { Resource } from "../../../types/perseus/Resource.ts";
import type { UsedContingent } from "../../../types/perseus/UsedContingent.ts";

export default function useUsageChartDatasetWithMax({
    dataset,
    chartResources,
    usedContingents,
    resources,
}: {
    dataset: { [key: string]: number | string }[];
    chartResources: Resource[];
    usedContingents: UsedContingent[];
    resources: Resource[];
}) {
    return useMemo(() => {
        const resourceById = new Map(
            resources.map((resource) => [resource.id, resource])
        );
        const contingentByResourceId = new Map(
            usedContingents.map((contingent) => [
                contingent.resource_id,
                contingent,
            ])
        );
        const resourcesWithPhaseAverage = new Set<string>();

        const datasetWithMax = dataset.map((point) => {
            const enrichedPoint: { [key: string]: number | string | null } = {
                ...point,
            };

            const dayLabel =
                typeof point.day === "string"
                    ? point.day
                    : typeof point.label === "string"
                      ? point.label
                      : null;
            const day = dayLabel
                ? dayjs.utc(dayLabel, "DD.MM.YY").startOf("day")
                : null;

            chartResources.forEach((chartResource) => {
                if (!day) {
                    enrichedPoint[`${chartResource.id}__max`] = null;
                    return;
                }

                const contingent = contingentByResourceId.get(chartResource.id);
                const resource = resourceById.get(chartResource.id);
                if (!contingent || !resource) {
                    enrichedPoint[`${chartResource.id}__max`] = null;
                    return;
                }

                const phase = contingent.phases.find((item) => {
                    const start = dayjs.utc(item.start).startOf("day");
                    const end = dayjs.utc(item.end).endOf("day");
                    return (
                        (day.isAfter(start) || day.isSame(start)) &&
                        (day.isBefore(end) || day.isSame(end))
                    );
                });

                if (!phase) {
                    enrichedPoint[`${chartResource.id}__max`] = null;
                    return;
                }

                const phaseStart = dayjs.utc(phase.start).startOf("day");
                const phaseEnd = dayjs.utc(phase.end).startOf("day");
                const daysInPhase = Math.max(
                    1,
                    phaseEnd.diff(phaseStart, "day") + 1
                );
                const averagePerDay = phase.max / daysInPhase;
                const normalizedAverage =
                    averagePerDay / (resource.display_unit_factor || 1);

                enrichedPoint[`${chartResource.id}__max`] = normalizedAverage;
                resourcesWithPhaseAverage.add(chartResource.id);
            });

            return enrichedPoint;
        });

        return {
            datasetWithMax,
            resourcesWithPhaseAverage,
        };
    }, [dataset, chartResources, usedContingents, resources]);
}
