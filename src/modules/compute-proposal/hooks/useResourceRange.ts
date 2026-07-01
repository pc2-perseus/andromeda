import type { Resource } from "../../../types/perseus/Resource.ts";
import useModuleConfig from "./useModuleConfig.ts";
import useType from "./useType.ts";
import { useMemo } from "react";

export default (
    resource: Resource
): [number | undefined, number | undefined] => {
    const [projectType] = useType();
    const config = useModuleConfig();

    if (!config || !projectType || !(projectType in config.allowed_resources)) {
        return [undefined, undefined];
    }

    const relevantItems = useMemo(
        () =>
            config.allowed_resources[projectType].filter(
                (item) => item.resource_id === resource.id
            ),
        [config.allowed_resources, projectType, resource.id]
    );

    if (relevantItems.length === 0) {
        return [undefined, undefined];
    }

    return [relevantItems[0].min, relevantItems[0].max];
};
