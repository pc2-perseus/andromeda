import type { DatabaseItem } from "./DatabaseItem.ts";

export type Limit = DatabaseItem & {
    id: string;
    name: string;
    display_unit: string | null;
    display_unit_factor: number;
};
