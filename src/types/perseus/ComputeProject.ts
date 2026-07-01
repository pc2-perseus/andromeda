import type { DatabaseItem } from "./DatabaseItem.ts";

export type ComputeProject = DatabaseItem & {
    compute_project_id: string;
    member_ids: string[];
    custom_fields: { [key: string]: unknown };
};
