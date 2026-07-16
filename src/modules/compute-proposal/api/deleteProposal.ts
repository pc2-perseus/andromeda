import makeAPICall from "../../../api/makeAPICall";
import { HTTPMethod } from "../../../api/HTTPMethod";

export default async function deleteProposal(
    projectOid: string
): Promise<boolean> {
    const response = await makeAPICall<{
        success: boolean;
    }>(
        HTTPMethod.DELETE,
        `/perseus/service/Andromeda/compute-proposal/${projectOid}`,
        {}
    );
    return response.success;
}
