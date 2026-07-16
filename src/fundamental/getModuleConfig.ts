import type { GlobalConfiguration } from "../types/GlobalConfiguration.ts";

export default function getModuleConfig(
    config: GlobalConfiguration,
    moduleId: string
): object | undefined {
    if (moduleId in config.module_configurations) {
        return config.module_configurations[moduleId];
    }
    return undefined;
}
