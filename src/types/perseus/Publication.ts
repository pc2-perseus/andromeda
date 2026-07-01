import type { DatabaseItem } from "./DatabaseItem.ts";
import type { PublicationDetails } from "./PublicationDetails.ts";

export type Publication = DatabaseItem & {
    type: "doi" | "bibtex";
    content: string;
    details: PublicationDetails;
};
