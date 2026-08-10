import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function removeUser({
    projectId,
    computeProjectId,
    personId,
}: {
    projectId: string;
    computeProjectId: string;
    personId: string;
}): Promise<void> {
    await makeAPICall<Record<string, never>>(
        HTTPMethod.DELETE,
        `/perseus/service/Andromeda/project/${projectId}/users`,
        { compute_project_id: computeProjectId, person_id: personId }
    );
}
