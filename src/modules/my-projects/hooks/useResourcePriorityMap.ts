import { useMemo } from "react";
import type { ResourcePriority } from "../../../types/perseus/ResourcePriority.ts";

export default function useResourcePriorityMap(
    resourcePriorities: ResourcePriority[]
) {
    return useMemo(() => {
        const map = new Map<number, ResourcePriority>();

        resourcePriorities.forEach((resourcePriority) => {
            map.set(resourcePriority.value, resourcePriority);
        });

        return map;
    }, [resourcePriorities]);
}
