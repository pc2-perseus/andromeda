import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { UsedContingent } from "../../../types/perseus/UsedContingent.ts";
import isoToDates from "../../../utils/isoToDates.ts";

export default async function getUsedContingents(
    projectId: string,
    computeProjectId: string
): Promise<UsedContingent[]> {
    const call = await makeAPICall<{
        used: UsedContingent[];
    }>(
        HTTPMethod.GET,
        `/perseus/service/Andromeda/Usage/used-contingents?project_oid=${projectId}&compute_project_id=${computeProjectId}`,
        undefined,
        true
    );

    return call.statusCode === 200 && call.value !== null
        ? call.value.used.map((item) => isoToDates(item))
        : [];
}
