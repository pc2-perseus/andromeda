import type { DatabaseItem } from "./DatabaseItem.ts";
import type { LimitValueOverwrite } from "./LimitValueOverwrite.ts";

export type LimitValue = DatabaseItem & {
    limit_id: string;
    value: number;
    start: Date;
    end: Date;
    affected_users: string[] | null;
    compute_project_id: string | null;
    overwrites: LimitValueOverwrite[];
};
