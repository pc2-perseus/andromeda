import type { DatabaseItem } from "./DatabaseItem.ts";
import type { DataDeletionKey } from "./DataDeletionKey.ts";

export type DataDeletionPeriod = DatabaseItem & {
    state_id: string;
    key: DataDeletionKey;
    additional_period: number | null;
};
