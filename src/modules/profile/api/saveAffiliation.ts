import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function saveAffiliation(
    affiliationOid: string
): Promise<boolean> {
    const response = await makeAPICall<{
        success: boolean;
    }>(
        HTTPMethod.POST,
        "/perseus/service/Andromeda/user/update/affiliation",
        { affiliation_oid: affiliationOid },
        true
    );

    return response.success;
}
