import type { DatabaseItem } from "./DatabaseItem.ts";
import type { JobState } from "./JobState.ts";

export type Job = DatabaseItem & {
    job_id: number;
    group_id?: number | null;
    group_index?: number | null;
    job_name: string | null;
    project_oid: string;
    compute_project_id: string;
    cluster_id: string;
    partition: string | null;
    nodes: string[];
    working_directory: string | null;
    submitted: Date | null;
    start: Date | null;
    end: Date | null;
    time_limit: number | null;
    user: string | null;
    state: JobState | null;
    priority_id: string | null;
    reservation: string | null;
    reason: string | null;
    cluster_cockpit_id: number | null;
    allocated_resources: string[];
    additional_data: { [key: string]: unknown };
};
