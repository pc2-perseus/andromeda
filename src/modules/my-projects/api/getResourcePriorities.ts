import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { ResourcePriority } from "../../../types/perseus/ResourcePriority.ts";

export default async function getResourcePriorities(): Promise<
    ResourcePriority[]
> {
    const response = await makeAPICall<{
        resource_priorities: ResourcePriority[];
    }>(HTTPMethod.GET, "/perseus/service/PriorityManager/all", undefined, true);

    return response.resource_priorities;
}
