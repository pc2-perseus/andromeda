import React from "react";
import type { Job } from "../../../types/perseus/Job.ts";
import getJobs from "../../my-projects/api/getJobs.ts";

const JOB_SUGGESTION_PAGE_SIZE = 100;

async function findLastJobsPage(
    projectOid: string,
    computeProjectId: string
): Promise<Job[]> {
    const cache = new Map<number, Job[]>();

    async function loadPage(page: number): Promise<Job[]> {
        if (!cache.has(page)) {
            cache.set(
                page,
                await getJobs(
                    projectOid,
                    computeProjectId,
                    page,
                    JOB_SUGGESTION_PAGE_SIZE
                )
            );
        }

        return cache.get(page) ?? [];
    }

    const firstPage = await loadPage(1);
    if (firstPage.length < JOB_SUGGESTION_PAGE_SIZE) {
        return firstPage;
    }

    let low = 1;
    let high = 2;
    let highPage = await loadPage(high);

    while (highPage.length > 0) {
        low = high;
        if (highPage.length < JOB_SUGGESTION_PAGE_SIZE) {
            return highPage;
        }

        high *= 2;
        highPage = await loadPage(high);
    }

    let left = low + 1;
    let right = high - 1;
    let lastPage = low;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midPage = await loadPage(mid);

        if (midPage.length > 0) {
            lastPage = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return loadPage(lastPage);
}

export default function useJobSuggestions(
    projectOid: string | null,
    computeProjectId: string | null
): {
    suggestions: string[];
    loading: boolean;
    error: string | null;
    suggestionLimit: number;
} {
    const [suggestions, setSuggestions] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let active = true;

        async function load(): Promise<void> {
            if (projectOid === null || computeProjectId === null) {
                setSuggestions([]);
                setError(null);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const lastJobs = await findLastJobsPage(
                    projectOid,
                    computeProjectId
                );

                if (!active) {
                    return;
                }

                const nextSuggestions = Array.from(
                    new Set(
                        lastJobs
                            .map((job) => job.job_id)
                            .sort((left, right) => right - left)
                            .map(String)
                    )
                );

                setSuggestions(nextSuggestions);
            } catch {
                if (!active) {
                    return;
                }

                setSuggestions([]);
                setError(
                    "Job suggestions could not be loaded. You can still enter any job ID."
                );
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        void load();

        return () => {
            active = false;
        };
    }, [computeProjectId, projectOid]);

    return {
        suggestions,
        loading,
        error,
        suggestionLimit: JOB_SUGGESTION_PAGE_SIZE,
    };
}
