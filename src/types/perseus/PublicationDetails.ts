import type { DatabaseItem } from "./DatabaseItem.ts";

export type PublicationDetails = DatabaseItem & {
    source: "semanticscholar" | "crossref";
    title: string | null;
    authors: string[];
    abstract: string | null;
    venue: string | null;
    publisher: string | null;
    year: number | null;
    citation_count: number | null;
    journal: string | null;
    bibtex: string | null;
    created: string | null;
};
