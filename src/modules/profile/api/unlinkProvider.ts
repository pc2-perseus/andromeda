import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function unlinkProvider(
    provider: string
): Promise<boolean> {
    const response = await makeAPICall<{
        success: boolean;
    }>(HTTPMethod.POST, "/auth/unlink", { provider }, true);

    return response.success;
}
