import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function executeLogout(next?: string): Promise<boolean> {
    const logoutEndpoint = `/auth/logout${next ? `?next=${encodeURIComponent(next)}` : ""}`;
    try {
        await makeAPICall<unknown>(HTTPMethod.GET, logoutEndpoint);
        return true;
    } catch (e) {
        console.error("Logout request failed", e);
        return false;
    }
}
