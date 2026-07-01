import makeAPICall from "../../../api/makeAPICall";
import { HTTPMethod } from "../../../api/HTTPMethod";

export default async function deleteProposal(
    projectOid: string
): Promise<boolean> {
    const call = await makeAPICall<{
        success: boolean;
    }>(
        HTTPMethod.DELETE,
        `/perseus/service/Andromeda/compute-proposal/${projectOid}`,
        {}
    );
    return call.statusCode === 200 && call.value !== null
        ? call.value.success
        : false;
}
