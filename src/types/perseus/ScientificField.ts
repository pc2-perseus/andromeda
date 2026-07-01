import type { DatabaseItem } from "./DatabaseItem.ts";

export type ScientificField = DatabaseItem & {
    version: string;
    subject_id: string;
    scientific_discipline: string | null;
    research_area: string | null;
    name: string | null;
};
