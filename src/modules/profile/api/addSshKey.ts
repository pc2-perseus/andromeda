import makeAPICall from "../../../api/makeAPICall";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

export default async function addSshKey(
    name: string,
    pub_ssh_key: string
): Promise<boolean> {
    const response = await makeAPICall<{ result: boolean }>(
        HTTPMethod.POST,
        "/perseus/service/Andromeda/SSHKey",
        { name, pub_ssh_key },
        true
    );

    return response.result;
}
