import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { Project } from "../../../types/perseus/Project.ts";
import isoToDates from "../../../utils/isoToDates.ts";

export default async function getProposals(): Promise<{
    created: Project[];
    submitted: Project[];
}> {
    const call = await makeAPICall<{
        created: Project[];
        submitted: Project[];
    }>(
        HTTPMethod.GET,
        "/perseus/service/Andromeda/compute-proposal/all",
        undefined,
        true
    );

    return call.statusCode === 200 && call.value !== null
        ? {
              created: isoToDates(call.value.created),
              submitted: isoToDates(call.value.submitted),
          }
        : { created: [], submitted: [] };
}
