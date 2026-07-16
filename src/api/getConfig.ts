import type { GlobalConfiguration } from "../types/GlobalConfiguration.ts";
import makeAPICall from "./makeAPICall.ts";
import { HTTPMethod } from "./HTTPMethod.ts";

export default async function getConfig(): Promise<GlobalConfiguration> {
    return await makeAPICall<GlobalConfiguration>(
        HTTPMethod.GET,
        "/perseus/service/Andromeda/config"
    );
}
