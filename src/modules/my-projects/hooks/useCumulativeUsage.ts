import { useMemo } from "react";
import type { ResourceUsage } from "../../../types/perseus/ResourceUsage.ts";
import useCumulativeResources from "./useCumulativeResources.ts";

export default function useCumulativeUsage(usage: ResourceUsage[]) {
    const cumulativeResources = useCumulativeResources();
    const cumulativeResourceIds = useMemo(
        () => new Set(cumulativeResources.map((resource) => resource.id)),
        [cumulativeResources]
    );

    return useMemo(
        () =>
            usage.filter(
                (item) =>
                    item.value > 0 &&
                    cumulativeResourceIds.has(item.resource_id)
            ),
        [usage, cumulativeResourceIds]
    );
}
