import { useProjectStore } from "../store/project.ts";
import type { Resource } from "../../../types/perseus/Resource.ts";
import { useCallback } from "react";

export default (resource: Resource): [number, (x: number) => void] => {
    const value = useProjectStore((state) =>
        state.getRequestedResource(resource)
    );

    const setRequestedResource = useProjectStore(
        (state) => state.setRequestedResource
    );

    const set = useCallback(
        (x: number) => setRequestedResource(resource, x),
        [setRequestedResource, resource]
    );

    return [value, set];
};
