import makeAPICall from "../../api/makeAPICall.ts";
import { HTTPMethod } from "../../api/HTTPMethod.ts";
import type { GlobalConfiguration } from "../../types/GlobalConfiguration.ts";

export default async function fetchGlobalConfig(): Promise<GlobalConfiguration> {
    let result: GlobalConfiguration = {
        enabledModules: [],
        moduleConfigurations: {},
    };
    try {
        const endpoint = "/perseus/service/Andromeda/config";

        const call = await makeAPICall<{
            enabled_modules: string[];
            module_configurations: { [key: string]: object };
        }>(HTTPMethod.GET, endpoint);

        if (call.statusCode === 200 && call.value !== null) {
            result = {
                enabledModules: call.value.enabled_modules,
                moduleConfigurations: call.value.module_configurations,
            };
        }
    } catch {
        // Do nothing, result remains default
    } finally {
        return result;
    }
}
