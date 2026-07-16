import makeAPICall from "./makeAPICall.ts";
import { HTTPMethod } from "./HTTPMethod.ts";
import type { AuthenticationData } from "../types/AuthenticationData.ts";
import type { Person } from "../types/perseus/Person.ts";
import { APIError } from "./APIError.ts";

export default async function getAuthData(): Promise<AuthenticationData> {
    try {
        const response = await makeAPICall<{
            perseus_oid?: string | null;
            username?: string | null;
            auth_provider?: string | null;
        }>(HTTPMethod.GET, "/auth/me");

        const authData: AuthenticationData = {
            oid: response.perseus_oid ?? null,
            username: response.username ?? null,
            validSession: true,
            person: null,
            auth_provider: response.auth_provider ?? undefined,
        };

        if (authData.oid) {
            authData.person = await makeAPICall<Person>(
                HTTPMethod.GET,
                "/perseus/service/Andromeda/user"
            );
        }

        return authData;
    } catch (e) {
        // allow 401 status -> user is not logged in
        if (e instanceof APIError && e.code === 401) {
            return {
                oid: null,
                username: null,
                validSession: false,
                person: null,
            };
        }

        console.error("Unexpected error in fetchAuthData", e);
        throw e;
    }
}
