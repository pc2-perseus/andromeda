import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";

interface LinkedProvider {
    identityProvider: string;
    userId: string;
    userName: string;
}

function normalizeLinkedProviders(providers: unknown): string[] {
    if (!Array.isArray(providers)) return [];

    return providers
        .filter(
            (p): p is LinkedProvider =>
                p !== null && typeof p === "object" && "identityProvider" in p
        )
        .map((p) => p.identityProvider.toLowerCase());
}

export default async function getLinkedProviders(): Promise<string[]> {
    const call = await makeAPICall<LinkedProvider[]>(
        HTTPMethod.GET,
        "/auth/linked-providers"
    );

    return call.statusCode === 200 && call.value
        ? normalizeLinkedProviders(call.value)
        : [];
}
