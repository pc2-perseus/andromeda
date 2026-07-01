import React from "react";
import useResources from "../../../contexts/resources";
import getEntries from "../api/getEntries.ts";
import getServices from "../api/getServices.ts";
import { buildSystemStatusGroups } from "../functions/systemStatus.ts";
import type { SystemStatusGroup } from "../types/SystemStatusGroup.ts";
import type { SystemStatusService } from "../../../types/perseus/SystemStatusService.ts";
import type { SystemStatusEntry } from "../../../types/perseus/SystemStatusEntry.ts";

export default function useSystemStatusOverview(): {
    groups: SystemStatusGroup[];
    services: SystemStatusService[];
    entries: SystemStatusEntry[];
    loading: boolean;
    error: string | null;
    reload: () => Promise<void>;
} {
    const { resourceData, loading: resourceLoading } = useResources();
    const [services, setServices] = React.useState<SystemStatusService[]>([]);
    const [entries, setEntries] = React.useState<SystemStatusEntry[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    const load = React.useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const [nextServices, nextEntries] = await Promise.all([
                getServices(),
                getEntries(),
            ]);
            setServices(nextServices);
            setEntries(nextEntries);
        } catch {
            setError("System status information could not be loaded.");
            setServices([]);
            setEntries([]);
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        void load();
    }, [load]);

    const groups = React.useMemo(
        (): SystemStatusGroup[] =>
            buildSystemStatusGroups(services, entries, resourceData.clusters),
        [entries, resourceData.clusters, services]
    );

    return {
        groups,
        services,
        entries,
        loading: loading || resourceLoading,
        error,
        reload: load,
    };
}
