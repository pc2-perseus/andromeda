import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function claimPI(
    proposalOid: string,
    token: string
): Promise<boolean> {
    const response = await makeAPICall<{
        success: boolean;
    }>(
        HTTPMethod.POST,
        `/perseus/service/Andromeda/compute-proposal/claim-pi`,
        { project_oid: proposalOid, token: token }
    );

    return response.success;
}
