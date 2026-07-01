import { useCallback, useEffect, useState } from "react";
import getUsedContingents from "../api/getUsedContingents.ts";
import type { UsedContingent } from "../../../types/perseus/UsedContingent.ts";

export default function useUsedContingents(
    projectId: string,
    computeProjectId: string
) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [usedContingents, setUsedContingents] = useState<UsedContingent[]>(
        []
    );

    const fetchUsedContingents = useCallback(async () => {
        setLoading(true);
        try {
            setUsedContingents(
                await getUsedContingents(projectId, computeProjectId)
            );
        } catch {
            setError("There was an error loading resource contingents");
        } finally {
            setLoading(false);
        }
    }, [projectId, computeProjectId]);

    useEffect(() => {
        fetchUsedContingents();
    }, [fetchUsedContingents]);

    return {
        usedContingents,
        loading,
        error,
    };
}
