import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { ResourceUsage } from "../../../types/perseus/ResourceUsage.ts";

export default async function getUsage(
    projectId: string,
    computeProjectId: string
): Promise<ResourceUsage[]> {
    const response = await makeAPICall<{
        used: ResourceUsage[];
    }>(
        HTTPMethod.GET,
        `/perseus/service/Andromeda/Usage/${projectId}?compute_project_id=${computeProjectId}`,
        undefined,
        true
    );

    return response.used;
}
