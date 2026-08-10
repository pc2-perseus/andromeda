import React from "react";
import { isSystemStatusEntryPlanned } from "../functions/systemStatus.ts";
import type { SystemStatusEntry } from "../../../types/perseus/SystemStatusEntry.ts";
import { SystemStatusCategory } from "../../../types/perseus/SystemStatusCategory.ts";

export default function useSystemStatusEntryStatusLabel(
    entry: SystemStatusEntry | null,
    now: Date = new Date()
): string {
    return React.useMemo((): string => {
        if (entry === null) {
            return SystemStatusCategory.RUNNING;
        }

        if (isSystemStatusEntryPlanned(entry, now)) {
            return "planned maintenance";
        }

        return entry.status_type;
    }, [entry, now]);
}
