import type { GlobalConfiguration } from "../types/GlobalConfiguration.ts";

export default function getModuleConfig(
    config: GlobalConfiguration,
    moduleId: string
): object | undefined {
    if (moduleId in config.moduleConfigurations) {
        return config.moduleConfigurations[moduleId];
    }
    return undefined;
}
