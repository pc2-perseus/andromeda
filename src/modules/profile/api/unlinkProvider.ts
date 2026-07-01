import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function unlinkProvider(
    provider: string
): Promise<boolean> {
    const call = await makeAPICall<{
        success: boolean;
    }>(HTTPMethod.POST, "/auth/unlink", { provider }, true);

    return call.statusCode === 200 && call.value?.success === true;
}
