import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { ResourcePriority } from "../../../types/perseus/ResourcePriority.ts";

export default async function getResourcePriorities(): Promise<
    ResourcePriority[]
> {
    const call = await makeAPICall<{
        resource_priorities: ResourcePriority[];
    }>(HTTPMethod.GET, "/perseus/service/PriorityManager/all", undefined, true);

    return call.statusCode === 200 && call.value !== null
        ? call.value.resource_priorities
        : [];
}
