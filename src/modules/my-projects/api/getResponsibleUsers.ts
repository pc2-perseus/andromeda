import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { Person } from "../../../types/perseus/Person.ts";

export default async function getResponsibleUsers(projectId: string) {
    const call = await makeAPICall<{
        principal_investigator: Person | null;
        person_of_contact: Person | null;
    }>(
        HTTPMethod.GET,
        `/perseus/service/Andromeda/projects/responsible-users/${projectId}`,
        undefined,
        true
    );

    return call.statusCode === 200 ? call.value : null;
}
