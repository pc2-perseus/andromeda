import { type DatabaseItem, DatabaseItemParams } from "./DatabaseItem.ts";
import type { Source } from "./Source.ts";
import type { ScientificField } from "./ScientificField.ts";
import type { ResourceValue } from "./ResourceValue.ts";
import type { LimitValue } from "./LimitValue.ts";
import type { ComputeProject } from "./ComputeProject.ts";
import type { Publication } from "./Publication.ts";
import type { StateMachine } from "./StateMachine.ts";
import type { DataDeletionPeriod } from "./DataDeletionPeriod.ts";

export type Project = DatabaseItem & {
    abbreviation: string | null;
    title: string | null;
    description: string | null;
    project_type: string | null;
    call: string | null;
    source: Source | null;
    affiliation_id: string | null;
    principal_investigator_id: string | null;
    person_of_contact_id: string | null;
    member_ids: string[];
    scientific_fields: ScientificField[];
    start: Date | null;
    end: Date | null;
    requested_resources: ResourceValue[];
    granted_resources: ResourceValue[];
    requested_limits: LimitValue[];
    granted_limits: LimitValue[];
    compute_projects: ComputeProject[];
    publications: Publication[];
    data_deletion_periods: DataDeletionPeriod[];
    state_machine: StateMachine | null; // this change from PERSEUS is necessary in order to create "new" projects without an initial state machine which will be set in PERSEUS
    custom_fields: {
        [key: string]: unknown;
        additional_description?: { [key: string]: unknown };
        funding?: {
            [key: string]: string | null;
        };
    };
    is_active: boolean;
};

export const ProjectParams: Project = {
    ...DatabaseItemParams,
    abbreviation: null,
    title: null,
    description: null,
    project_type: null,
    call: null,
    source: {
        ...DatabaseItemParams,
        name: "Andromeda",
        foreign_id: -1,
        created: new Date(),
        is_followup: false,
        predecessor_id: null,
        raw: {},
    },
    affiliation_id: null,
    principal_investigator_id: null,
    person_of_contact_id: null,
    member_ids: [],
    scientific_fields: [],
    start: null,
    end: null,
    requested_resources: [],
    granted_resources: [],
    requested_limits: [],
    granted_limits: [],
    compute_projects: [],
    publications: [],
    data_deletion_periods: [],
    state_machine: null,
    custom_fields: {},
    is_active: false,
};
