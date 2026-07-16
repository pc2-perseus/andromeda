import type { LoginOption } from "../../login/api/getLoginOptions.ts";
import type { LinkedProvider } from "../../../types/perseus/LinkedProvider.ts";

export default function useLinkedLoginOptions(params: {
    linked: LinkedProvider[];
    options: LoginOption[];
}) {
    const { linked, options } = params;

    return options.map((opt) => ({
        ...opt,
        linked: new Set(linked.map((l) => l.identityProvider)).has(
            opt.identifier.toLowerCase()
        ),
    }));
}
