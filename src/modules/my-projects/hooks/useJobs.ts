import { useCallback, useEffect, useState } from "react";
import type { Job } from "../../../types/perseus/Job.ts";
import getJobs from "../api/getJobs.ts";

export default function useJobs(
    projectOid: string | null,
    computeProjectId: string,
    page: number,
    pageSize: number
) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);

    const fetchJobs = useCallback(async () => {
        if (projectOid === null) {
            setJobs([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            setJobs(
                await getJobs(projectOid, computeProjectId, page, pageSize)
            );
        } catch {
            setError(
                "There was an error loading jobs for this compute project"
            );
        } finally {
            setLoading(false);
        }
    }, [computeProjectId, page, pageSize, projectOid]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    return {
        jobs,
        loading,
        error,
    };
}
