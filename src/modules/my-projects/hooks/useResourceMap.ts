import { useMemo } from "react";
import useResources from "../../../contexts/resources";
import type { Resource } from "../../../types/perseus/Resource.ts";

export default function useResourceMap() {
    const {
        resourceData: { resources },
    } = useResources();

    return useMemo(() => {
        const map = new Map<string, Resource>();
        resources.forEach((resource) => {
            map.set(resource.id, resource);
        });
        return map;
    }, [resources]);
}
