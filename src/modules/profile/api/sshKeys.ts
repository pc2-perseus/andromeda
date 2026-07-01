import makeAPICall from "../../../api/makeAPICall";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { SSHKey } from "../../../types/perseus/SSHKey.ts";

export async function getSSHKeys(): Promise<SSHKey[]> {
    const call = await makeAPICall<{ pub_ssh_keys: SSHKey[] }>(
        HTTPMethod.GET,
        "/perseus/service/Andromeda/SSHKey",
        undefined,
        true
    );
    return call.statusCode === 200 ? (call.value?.pub_ssh_keys ?? []) : [];
}

export async function addSSHKey(
    name: string,
    pub_ssh_key: string
): Promise<boolean> {
    const call = await makeAPICall<{ result: boolean }>(
        HTTPMethod.POST,
        "/perseus/service/Andromeda/SSHKey",
        { name, pub_ssh_key },
        true
    );
    return call.statusCode === 200 && call.value?.result === true;
}

export async function deleteSSHKey(sshkey_oid: string): Promise<boolean> {
    const call = await makeAPICall<{ result: boolean }>(
        HTTPMethod.DELETE,
        `/perseus/service/Andromeda/SSHKey/${sshkey_oid}`,
        {},
        true
    );
    return call.statusCode === 200 && call.value?.result === true;
}
