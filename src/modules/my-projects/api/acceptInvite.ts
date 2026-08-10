import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function acceptInvite({
    projectId,
    invitationId,
    token,
}: {
    projectId: string;
    invitationId: string;
    token: string;
}): Promise<void> {
    return await makeAPICall<void>(
        HTTPMethod.POST,
        `/perseus/service/Andromeda/project/${projectId}/invites/accept`,
        { invitation_id: invitationId, token }
    );
}
