import type { DatabaseItem } from "./DatabaseItem.ts";
import type { LimitValueOverwriteType } from "./LimitValueOverwriteType.ts";

export type LimitValueOverwrite = DatabaseItem & {
    overwrite_id: string;
    type: LimitValueOverwriteType;
    start: Date;
    end: Date;
    value: string | number | null;
    comment: string | null;
};
