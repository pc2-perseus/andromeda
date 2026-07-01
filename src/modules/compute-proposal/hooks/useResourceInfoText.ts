import { useMemo } from "react";
import type { Resource } from "../../../types/perseus/Resource.ts";
import useModuleConfig from "./useModuleConfig.ts";
import useType from "./useType.ts";

export default (resource: Resource): string | null => {
    const [projectType] = useType();
    const config = useModuleConfig();

    if (!config) {
        return null;
    }

    return useMemo(() => {
        return projectType !== null && projectType in config.allowed_resources
            ? (config.allowed_resources[projectType].filter(
                  (elem) => elem.resource_id === resource.id
              )[0]?.info_text ?? null)
            : null;
    }, [projectType, config.allowed_resources, resource.id]);
};
