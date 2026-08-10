import type { Project } from "../../../types/perseus/Project.ts";
import type { Source } from "../../../types/perseus/Source.ts";
import type { StateMachine } from "../../../types/perseus/StateMachine.ts";

export type MyProject = Omit<
    Project,
    "data_deletion_periods" | "source" | "state_machine"
> & {
    source: Omit<Source, "raw">;
    state_machine: Omit<StateMachine, "events">;
};

export type MyProjectListItem = Pick<
    Project,
    "title" | "abbreviation" | "project_type"
> & {
    _id: string;
    foreign_id: string | null;
    source_name: string | null;
    current_states: string[];
};

export type ComputeProjectOverviewItem = {
    project_oid: string;
    title: string | null;
    compute_project_id: string;
    states: string[];
    recent_jobs: {
        date: string;
        count: number;
    }[];
    pending_running_jobs: number;
};

export type ProjectManagementUser = {
    person_id: string;
    username: string | null;
    title: string | null;
    firstname: string;
    lastname: string;
    email: string;
    compute_project_ids: string[];
};
