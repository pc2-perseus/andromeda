import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { SystemStatusService } from "../../../types/perseus/SystemStatusService.ts";

export default async function getServices(): Promise<SystemStatusService[]> {
    const response = await makeAPICall<{
        services: SystemStatusService[];
    }>(HTTPMethod.GET, "/perseus/service/SystemStatus/services");

    return response.services;
}
