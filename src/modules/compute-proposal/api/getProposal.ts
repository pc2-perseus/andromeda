import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { Project } from "../../../types/perseus/Project.ts";
import isoToDates from "../../../utils/isoToDates.ts";

export default async function getProposal(
    proposalOid: string
): Promise<Project | null> {
    const call = await makeAPICall<Project>(
        HTTPMethod.GET,
        `/perseus/service/Andromeda/compute-proposal/single?oid=${proposalOid}`,
        undefined,
        true
    );

    return call.statusCode === 200 ? isoToDates(call.value) : null;
}
