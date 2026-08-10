import React from "react";
import { SystemStatusCategory } from "../../../types/perseus/SystemStatusCategory.ts";
import useSystemStatusEntryStatusLabel from "../../system-status/hooks/useSystemStatusEntryStatusLabel.ts";
import type { SystemStatusGroup } from "../../system-status/types/SystemStatusGroup.ts";
import StatusBarCard from "./StatusBarCard.tsx";

export default function StatusBarGroupCard({
    group,
    onDetailsClick,
}: {
    group: SystemStatusGroup;
    onDetailsClick?: () => void;
}): React.ReactElement {
    const statusLabel = useSystemStatusEntryStatusLabel(group.topEntry);

    return (
        <StatusBarCard
            name={group.title}
            category={group.topEntry?.category ?? SystemStatusCategory.RUNNING}
            message={
                group.topEntry !== null
                    ? `${statusLabel}: ${group.topEntry.title}`
                    : "All services up and running"
            }
            activeEntryCount={group.statusChangeCount}
            onDetailsClick={onDetailsClick}
        />
    );
}
