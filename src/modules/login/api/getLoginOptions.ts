import makeAPICall from "../../../api/makeAPICall";
import { HTTPMethod } from "../../../api/HTTPMethod";

export type LoginOption = {
    identifier: string;
    display_name: string;
};

export default async function getLoginOptions(): Promise<LoginOption[]> {
    return await makeAPICall<LoginOption[]>(
        HTTPMethod.GET,
        "/auth/login-options"
    );
}
