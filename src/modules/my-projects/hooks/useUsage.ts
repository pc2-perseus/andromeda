import { useCallback, useEffect, useMemo, useState } from "react";
import type { ResourceUsage } from "../../../types/perseus/ResourceUsage.ts";
import getUsage from "../api/getUsage.ts";
import useCumulativeResources from "./useCumulativeResources.ts";

export default function useUsage(projectId: string, computeProjectId: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [usage, setUsage] = useState<ResourceUsage[]>([]);
    const cumulativeResources = useCumulativeResources();
    const cumulativeResourceIds = useMemo(
        () => new Set(cumulativeResources.map((resource) => resource.id)),
        [cumulativeResources]
    );

    const fetchUsage = useCallback(async () => {
        setLoading(true);
        try {
            setUsage(await getUsage(projectId, computeProjectId));
        } catch {
            setError("There was an error loading your project usage");
        } finally {
            setLoading(false);
        }
    }, [projectId, computeProjectId]);

    useEffect(() => {
        fetchUsage();
    }, [fetchUsage]);

    const filteredUsage = useMemo(
        () =>
            usage.filter(
                (item) =>
                    item.value > 0 &&
                    cumulativeResourceIds.has(item.resource_id)
            ),
        [usage, cumulativeResourceIds]
    );

    return {
        usage: filteredUsage,
        loading,
        error,
    };
}
