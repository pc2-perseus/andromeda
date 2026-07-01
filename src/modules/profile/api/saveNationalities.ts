import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function saveNationalities(
    nationalities: string[]
): Promise<boolean> {
    const call = await makeAPICall<{
        success: boolean;
    }>(
        HTTPMethod.POST,
        "/perseus/service/Andromeda/user/update/nationalities",
        { nationalities: nationalities }
    );

    return call.statusCode === 200 && call.value?.success === true;
}
