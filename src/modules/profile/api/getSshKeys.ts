import makeAPICall from "../../../api/makeAPICall";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { SSHKey } from "../../../types/perseus/SSHKey.ts";

export default async function getSshKeys(): Promise<SSHKey[]> {
    const response = await makeAPICall<{ pub_ssh_keys: SSHKey[] }>(
        HTTPMethod.GET,
        "/perseus/service/Andromeda/SSHKey",
        undefined,
        true
    );
    return response.pub_ssh_keys;
}
