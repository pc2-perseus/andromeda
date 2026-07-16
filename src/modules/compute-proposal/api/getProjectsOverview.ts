import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type {
    ProjectOverviewItem,
    ProjectOverviewResponse,
} from "../types/ProjectOverviewResponse.ts";

export default async function getProjectsOverview(): Promise<
    ProjectOverviewItem[]
> {
    const response = await makeAPICall<ProjectOverviewResponse>(
        HTTPMethod.GET,
        "/perseus/service/Andromeda/projects/overview"
    );

    return response.items;
}
