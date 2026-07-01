import makeAPICall from "../../api/makeAPICall.ts";
import { HTTPMethod } from "../../api/HTTPMethod.ts";
import type { AuthenticationData } from "../../types/AuthenticationData.ts";
import type { Person } from "../../types/perseus/Person.ts";

async function fetchPersonData(): Promise<Person | null> {
    try {
        const call = await makeAPICall<Person | null>(
            HTTPMethod.GET,
            "/perseus/service/Andromeda/user"
        );

        return call.statusCode === 200 ? call.value : null;
    } catch (e) {
        console.error("Failed to fetch person data", e);
        return null;
    }
}

export default async function fetchAuthData(): Promise<AuthenticationData> {
    try {
        const call = await makeAPICall<any>(HTTPMethod.GET, "/auth/me");

        if (call.statusCode === 503) {
            const err = new Error("MAINTENANCE");
            (err as any).status = 503;
            throw err;
        }

        if (call.statusCode === 401) {
            return {
                oid: null,
                username: null,
                validSession: false,
                person: null,
            };
        }

        if (call.statusCode === 200 && call.value) {
            const body = call.value as any;

            const authData: AuthenticationData = {
                oid: body.perseus_oid ?? null,
                username: body.username ?? null,
                validSession: true,
                person: null,
                auth_provider: body.auth_provider ?? null,
            };

            if (authData.oid) {
                authData.person = await fetchPersonData();
            }

            return authData;
        }

        return { oid: null, username: null, validSession: false, person: null };
    } catch (e) {
        // forward maintenance errors
        if (
            (e as any)?.status === 503 ||
            (e as any).message === "MAINTENANCE"
        ) {
            throw e;
        }

        console.error("Unexpected error in fetchAuthData", e);
        return { oid: null, username: null, validSession: false, person: null };
    }
}
