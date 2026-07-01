import { useMemo } from "react";
import dayjs from "dayjs";
import type { Resource } from "../../../types/perseus/Resource.ts";
import type { UsedContingent } from "../../../types/perseus/UsedContingent.ts";

export default function useResourcePhaseAverageById({
    usedContingents,
    resources,
    filterEndDate,
}: {
    usedContingents: UsedContingent[];
    resources: Resource[];
    filterEndDate: Date | null;
}) {
    return useMemo(() => {
        const averageById = new Map<string, number>();
        if (!filterEndDate) {
            return averageById;
        }

        usedContingents.forEach((contingent) => {
            const resource = resources.find(
                (item) => item.id === contingent.resource_id
            );
            if (!resource) {
                return;
            }

            const anchorDate = dayjs.utc(filterEndDate);
            const selectedPhase =
                contingent.phases.find((phase) => {
                    const start = dayjs.utc(phase.start).startOf("day");
                    const end = dayjs.utc(phase.end).endOf("day");
                    return (
                        (anchorDate.isAfter(start) ||
                            anchorDate.isSame(start)) &&
                        (anchorDate.isBefore(end) || anchorDate.isSame(end))
                    );
                }) ??
                [...contingent.phases].sort(
                    (left, right) =>
                        dayjs.utc(right.end).valueOf() -
                        dayjs.utc(left.end).valueOf()
                )[0];

            if (!selectedPhase) {
                return;
            }

            const phaseStart = dayjs.utc(selectedPhase.start).startOf("day");
            const phaseEnd = dayjs.utc(selectedPhase.end).startOf("day");
            const daysInPhase = Math.max(
                1,
                phaseEnd.diff(phaseStart, "day") + 1
            );
            const averagePerDay = selectedPhase.max / daysInPhase;

            averageById.set(
                contingent.resource_id,
                averagePerDay / (resource.display_unit_factor || 1)
            );
        });

        return averageById;
    }, [usedContingents, resources, filterEndDate]);
}
