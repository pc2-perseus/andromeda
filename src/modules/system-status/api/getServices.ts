import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { SystemStatusService } from "../../../types/perseus/SystemStatusService.ts";

export default async function getServices(): Promise<SystemStatusService[]> {
    const call = await makeAPICall<{
        services: SystemStatusService[];
    }>(HTTPMethod.GET, "/perseus/service/SystemStatus/services");

    return call.statusCode === 200 && call.value !== null
        ? call.value.services
        : [];
}
