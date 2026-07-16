import { useMemo } from "react";
import type { ResourcePriority } from "../../../types/perseus/ResourcePriority.ts";

export type ResourcePriorityInfo = {
    label: string;
    color: string | null;
    textColor: string | null;
};

export default function useResourcePriorityMap(
    resourcePriorities: ResourcePriority[]
) {
    return useMemo(() => {
        const map = new Map<number, ResourcePriorityInfo>();
        resourcePriorities.forEach((resourcePriority) => {
            map.set(resourcePriority.value, {
                label: resourcePriority.priority_id,
                color:
                    resourcePriority.color ??
                    resourcePriority.background_color ??
                    null,
                textColor: resourcePriority.text_color ?? null,
            });
        });
        return map;
    }, [resourcePriorities]);
}
