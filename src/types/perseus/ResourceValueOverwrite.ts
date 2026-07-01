import type { DatabaseItem } from "./DatabaseItem.ts";
import type { ResourceValueOverwriteType } from "./ResourceValueOverwriteType.ts";

export type ResourceValueOverwrite = DatabaseItem & {
    overwrite_id: string;
    type: ResourceValueOverwriteType;
    start: Date;
    end: Date;
    value: string | number | null;
    comment: string | null;
};
