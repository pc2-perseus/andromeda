import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function executeLogout(): Promise<boolean> {
    try {
        await makeAPICall<unknown>(HTTPMethod.GET, "/auth/logout");
        return true;
    } catch (e) {
        console.error("Logout request failed", e);
        return false;
    }
}
