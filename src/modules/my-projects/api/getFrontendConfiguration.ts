import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { FrontendConfiguration } from "../../../types/perseus/FrontendConfiguration.ts";

export default async function getFrontendConfiguration(): Promise<FrontendConfiguration> {
    const response = await makeAPICall<{
        configuration: FrontendConfiguration;
    }>(HTTPMethod.GET, "/perseus/service/FrontendConfigurationManager/config");

    return response.configuration;
}
