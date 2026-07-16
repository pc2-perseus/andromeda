import type { DatabaseItem } from "./DatabaseItem.ts";

export type ResourcePriority = DatabaseItem & {
    priority_id: string;
    value: number;
    color?: string | null;
    background_color?: string | null;
    text_color?: string | null;
};
