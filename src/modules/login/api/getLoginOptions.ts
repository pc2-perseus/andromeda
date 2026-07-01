import makeAPICall from "../../../api/makeAPICall";
import { HTTPMethod } from "../../../api/HTTPMethod";

export type LoginOption = {
    identifier: string;
    display_name: string;
};

export default async function getLoginOptions(): Promise<LoginOption[]> {
    const call = await makeAPICall<LoginOption[]>(
        HTTPMethod.GET,
        "/auth/login-options"
    );

    return call.statusCode === 200 && call.value ? call.value : [];
}
