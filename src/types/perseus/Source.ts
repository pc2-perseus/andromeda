import type { DatabaseItem } from "./DatabaseItem.ts";

export type Source = DatabaseItem & {
    name: string;
    foreign_id: number | string;
    created: Date;
    is_followup: boolean;
    predecessor_id: string | null;
    raw: { [key: string]: unknown };
};
