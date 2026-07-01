import type { Limit } from "../types/perseus/Limit.ts";

/**
 * Matches a limit id with the corresponding limit.
 * @param limitId
 * @param limits
 */
export default function limitMatch(
    limitId: string | undefined,
    limits: Limit[]
): Limit | undefined {
    try {
        return limits.filter((l: Limit) => l.id === limitId)[0];
    } catch {
        return undefined;
    }
}
