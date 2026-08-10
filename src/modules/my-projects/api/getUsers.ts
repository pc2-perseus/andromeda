import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { ProjectManagementUser } from "../types/project.ts";

export default async function getUsers(
    projectId: string
): Promise<ProjectManagementUser[]> {
    const response = await makeAPICall<{ items: ProjectManagementUser[] }>(
        HTTPMethod.GET,
        `/perseus/service/Andromeda/project/${projectId}/users`
    );

    return response.items;
}
