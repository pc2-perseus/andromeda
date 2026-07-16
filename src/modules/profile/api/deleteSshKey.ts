import makeAPICall from "../../../api/makeAPICall";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function deleteSshKey(
    sshkey_oid: string
): Promise<boolean> {
    const response = await makeAPICall<{ result: boolean }>(
        HTTPMethod.DELETE,
        `/perseus/service/Andromeda/SSHKey/${sshkey_oid}`,
        {},
        true
    );

    return response.result;
}
