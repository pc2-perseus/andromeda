import React from "react";
import { buildSystemStatusGroups } from "../functions/systemStatus.ts";
import type { SystemStatusGroup } from "../types/SystemStatusGroup.ts";
import type { SystemStatusService } from "../../../types/perseus/SystemStatusService.ts";
import type { SystemStatusEntry } from "../../../types/perseus/SystemStatusEntry.ts";
import useResources from "../../../hooks/useResources.ts";

export default function useSystemStatusGroups(params: {
    entries: SystemStatusEntry[];
    services: SystemStatusService[];
}) {
    const { clusters } = useResources();
    const { entries, services } = params;

    return React.useMemo(
        (): SystemStatusGroup[] =>
            buildSystemStatusGroups(services, entries, clusters),
        [entries, clusters, services]
    );
}
