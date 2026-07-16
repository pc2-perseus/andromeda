import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function saveEmail(email: string): Promise<boolean> {
    const response = await makeAPICall<{
        success: boolean;
    }>(
        HTTPMethod.POST,
        "/perseus/service/Andromeda/user/update/email",
        { email: email },
        true
    );

    return response.success;
}
