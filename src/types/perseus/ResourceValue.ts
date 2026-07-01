import { type DatabaseItem, DatabaseItemParams } from "./DatabaseItem.ts";
import type { ResourceValueOverwrite } from "./ResourceValueOverwrite.ts";

export type ResourceValue = DatabaseItem & {
    resource_id: string;
    value: number;
    start: Date;
    end: Date;
    compute_project_id: string | null;
    partitions: string[];
    overwrites: ResourceValueOverwrite[];
    priority: number;
    blocked: boolean;
};

export const ResourceValueParams: ResourceValue = {
    ...DatabaseItemParams,
    resource_id: "",
    value: 0,
    start: new Date(),
    end: new Date(),
    compute_project_id: null,
    partitions: [],
    overwrites: [],
    priority: 0,
    blocked: false,
};
