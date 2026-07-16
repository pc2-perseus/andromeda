import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { LinkedProvider } from "../../../types/perseus/LinkedProvider.ts";

export default async function getLinkedProviders() {
    return await makeAPICall<LinkedProvider[]>(
        HTTPMethod.GET,
        "/auth/linked-providers"
    );
}
