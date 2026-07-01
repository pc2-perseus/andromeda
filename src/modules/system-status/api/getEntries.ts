import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import isoToDates from "../../../utils/isoToDates.ts";
import type { SystemStatusEntry } from "../../../types/perseus/SystemStatusEntry.ts";

export default async function getEntries(): Promise<SystemStatusEntry[]> {
    const call = await makeAPICall<{
        entries: SystemStatusEntry[];
    }>(HTTPMethod.GET, "/perseus/service/SystemStatus/entries");

    return call.statusCode === 200 && call.value !== null
        ? isoToDates(call.value.entries)
        : [];
}
