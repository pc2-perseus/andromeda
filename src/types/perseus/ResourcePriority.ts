import type { DatabaseItem } from "./DatabaseItem.ts";

export type ResourcePriority = DatabaseItem & {
    priority_id: string;
    value: number;
};
