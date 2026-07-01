import type { DatabaseItem } from "./DatabaseItem.ts";

export type Cluster = DatabaseItem & {
    id: string;
    name: string;
};
