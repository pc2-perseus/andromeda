import React from "react";
import type { SystemStatusEntry } from "../../../types/perseus/SystemStatusEntry.ts";
import useSystemStatusEntryStatusLabel from "../hooks/useSystemStatusEntryStatusLabel.ts";
import StatusChip from "./StatusChip.tsx";

export default function EntryStatusChip({
    entry,
}: {
    entry: SystemStatusEntry;
}): React.ReactElement {
    const label = useSystemStatusEntryStatusLabel(entry);

    return <StatusChip category={entry.category} label={label} />;
}
