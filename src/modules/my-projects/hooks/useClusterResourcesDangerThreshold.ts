import { useMemo } from "react";
import getModuleConfig from "../../../fundamental/getModuleConfig.ts";
import type { ModuleConfig } from "../../../types/ModuleConfig.ts";
import useConfig from "../../../hooks/useConfig.ts";

export default function useClusterResourcesDangerThreshold(): number {
    const config = useConfig();
    const moduleConfig = getModuleConfig(config, "my-projects") as
        | ModuleConfig
        | undefined;

    return useMemo(() => {
        const configured = moduleConfig?.cluster_resources_danger_threshold;
        if (configured === undefined || !Number.isFinite(configured)) {
            return 0.9;
        }
        return Math.min(1, Math.max(0, configured));
    }, [moduleConfig?.cluster_resources_danger_threshold]);
}
