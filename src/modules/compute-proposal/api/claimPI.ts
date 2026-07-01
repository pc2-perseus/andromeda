import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function claimPI(
    proposalOid: string,
    token: string
): Promise<boolean> {
    const call = await makeAPICall<{
        success: boolean;
    }>(
        HTTPMethod.POST,
        `/perseus/service/Andromeda/compute-proposal/claim-pi`,
        { project_oid: proposalOid, token: token }
    );

    return call.statusCode === 200 && call.value?.success === true;
}
