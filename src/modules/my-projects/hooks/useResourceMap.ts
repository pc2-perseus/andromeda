import { useMemo } from "react";
import type { Resource } from "../../../types/perseus/Resource.ts";
import useResources from "../../../hooks/useResources.ts";

export default function useResourceMap() {
    const { resources } = useResources();

    return useMemo(() => {
        const map = new Map<string, Resource>();
        resources.forEach((resource) => {
            map.set(resource.id, resource);
        });
        return map;
    }, [resources]);
}
