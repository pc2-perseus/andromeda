import type { DatabaseItem } from "./DatabaseItem.ts";

export type Institute = DatabaseItem & {
    name: string;
    secondary_names: string[];
    organization_id: string | null;
};
