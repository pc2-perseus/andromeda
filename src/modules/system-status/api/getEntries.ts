import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import isoToDates from "../../../utils/isoToDates.ts";
import type { SystemStatusEntry } from "../../../types/perseus/SystemStatusEntry.ts";

export default async function getEntries(): Promise<SystemStatusEntry[]> {
    const response = await makeAPICall<{
        entries: SystemStatusEntry[];
    }>(HTTPMethod.GET, "/perseus/service/Andromeda/system-status/entries");

    return isoToDates(response.entries);
}
