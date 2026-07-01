import type { GlobalConfiguration } from "../../types/GlobalConfiguration.ts";

export type ConfigurationContextData = {
    config: GlobalConfiguration;
    loading: boolean;
    reloadConfig: () => void;
};
