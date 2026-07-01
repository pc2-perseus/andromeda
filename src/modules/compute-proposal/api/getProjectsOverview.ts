import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type {
    ProjectOverviewItem,
    ProjectOverviewResponse,
} from "../types/ProjectOverviewResponse.ts";

export default async function getProjectsOverview(): Promise<
    ProjectOverviewItem[]
> {
    const call = await makeAPICall<ProjectOverviewResponse>(
        HTTPMethod.GET,
        "/perseus/service/Andromeda/projects/overview"
    );

    return call.statusCode === 200 && call.value !== null
        ? call.value.items
        : [];
}
