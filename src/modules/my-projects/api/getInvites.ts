import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import isoToDates from "../../../utils/isoToDates.ts";
import type { UserInvite } from "../../../types/perseus/UserInvite.ts";

export default async function getInvites(
    projectId: string
): Promise<UserInvite[]> {
    const response = await makeAPICall<{ items: UserInvite[] }>(
        HTTPMethod.GET,
        `/perseus/service/Andromeda/project/${projectId}/invites`
    );

    return isoToDates(response.items);
}
