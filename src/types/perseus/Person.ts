import type { DatabaseItem } from "./DatabaseItem.ts";
import type { Location } from "./Location.ts";

export type Person = DatabaseItem & {
    username: string | null;
    title: string | null;
    firstname: string;
    lastname: string;
    email: string;
    orcid: string | null;
    phone: string | null;
    homepage: string | null;
    nationalities: string[];
    location: Location | null;
    affiliation_oid: string | null;
};
