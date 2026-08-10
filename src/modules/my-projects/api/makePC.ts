import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function makePC({
    projectId,
    personId,
}: {
    projectId: string;
    personId: string;
}): Promise<void> {
    await makeAPICall<Record<string, never>>(
        HTTPMethod.POST,
        `/perseus/service/Andromeda/project/${projectId}/users/make-pc`,
        { person_id: personId }
    );
}
