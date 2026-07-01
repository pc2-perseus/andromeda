import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function saveAffiliation(
    affiliationOid: string
): Promise<boolean> {
    const call = await makeAPICall<{
        success: boolean;
    }>(
        HTTPMethod.POST,
        "/perseus/service/Andromeda/user/update/affiliation",
        { affiliation_oid: affiliationOid },
        true
    );

    return call.statusCode === 200 && call.value?.success === true;
}
