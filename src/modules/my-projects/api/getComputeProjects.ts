import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { ComputeProjectOverviewItem } from "../types/project.ts";

type ComputeProjectOverviewResponse = {
    items: ComputeProjectOverviewItem[];
};

export default async function getComputeProjects(): Promise<
    ComputeProjectOverviewItem[]
> {
    const response = await makeAPICall<ComputeProjectOverviewResponse>(
        HTTPMethod.GET,
        "/perseus/service/Andromeda/compute-projects"
    );

    return response.items;
}
