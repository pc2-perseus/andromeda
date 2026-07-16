import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { Project } from "../../../types/perseus/Project.ts";
import isoToDates from "../../../utils/isoToDates.ts";

export default async function getProposals(): Promise<{
    created: Project[];
    submitted: Project[];
}> {
    const response = await makeAPICall<{
        created: Project[];
        submitted: Project[];
    }>(
        HTTPMethod.GET,
        "/perseus/service/Andromeda/compute-proposal/all",
        undefined,
        true
    );

    return {
        created: isoToDates(response.created),
        submitted: isoToDates(response.submitted),
    };
}
