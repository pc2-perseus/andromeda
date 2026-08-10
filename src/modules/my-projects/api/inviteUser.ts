import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function inviteUser({
    projectId,
    computeProjectId,
    email,
}: {
    projectId: string;
    computeProjectId: string;
    email: string;
}): Promise<void> {
    await makeAPICall<Record<string, never>>(
        HTTPMethod.POST,
        `/perseus/service/Andromeda/project/${projectId}/invites`,
        { compute_project_id: computeProjectId, email }
    );
}
