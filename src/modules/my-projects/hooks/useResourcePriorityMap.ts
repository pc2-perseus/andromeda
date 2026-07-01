import { useCallback, useEffect, useMemo, useState } from "react";
import getResourcePriorities from "../api/getResourcePriorities.ts";
import type { ResourcePriority } from "../../../types/perseus/ResourcePriority.ts";

export default function useResourcePriorityMap() {
    const [resourcePriorities, setResourcePriorities] = useState<
        ResourcePriority[]
    >([]);

    const fetchResourcePriorities = useCallback(async () => {
        try {
            setResourcePriorities(await getResourcePriorities());
        } catch {
            setResourcePriorities([]);
        }
    }, []);

    useEffect(() => {
        fetchResourcePriorities();
    }, [fetchResourcePriorities]);

    return useMemo(() => {
        const map = new Map<number, string>();
        resourcePriorities.forEach((resourcePriority) => {
            map.set(resourcePriority.value, resourcePriority.priority_id);
        });
        return map;
    }, [resourcePriorities]);
}
