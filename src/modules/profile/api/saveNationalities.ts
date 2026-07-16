import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function saveNationalities(
    nationalities: string[]
): Promise<boolean> {
    const response = await makeAPICall<{
        success: boolean;
    }>(
        HTTPMethod.POST,
        "/perseus/service/Andromeda/user/update/nationalities",
        { nationalities: nationalities }
    );

    return response.success;
}
