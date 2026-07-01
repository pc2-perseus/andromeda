import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { AuthenticationData } from "../../../types/AuthenticationData.ts";

export default async function executeLogin(
    username: string,
    password: string
): Promise<AuthenticationData> {
    const call = await makeAPICall<{
        perseus_oid: string | null;
        username: string;
        authenticated: boolean;
    }>(HTTPMethod.POST, "/auth/login", {
        username: username,
        password: password,
    });

    return call.statusCode === 200 && call.value !== null
        ? {
              oid: call.value.perseus_oid,
              username: call.value.username,
              validSession: call.value.authenticated,
              person: null,
          }
        : { oid: null, username: null, validSession: false, person: null };
}
