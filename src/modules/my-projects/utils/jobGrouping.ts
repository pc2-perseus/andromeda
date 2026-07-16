import type { Job } from "../../../types/perseus/Job.ts";

export function isGroupJob(job: Job): boolean {
    return typeof job.group_id === "number" && job.group_id > 0;
}

export function formatJobDisplayId(
    job: Job,
    includeGroupIndex: boolean = false
): string {
    if (!isGroupJob(job)) {
        return String(job.job_id);
    }

    if (includeGroupIndex) {
        const groupIndex = job.group_index ?? 0;

        return `${job.group_id}_${groupIndex}`;
    }

    return String(job.group_id);
}
