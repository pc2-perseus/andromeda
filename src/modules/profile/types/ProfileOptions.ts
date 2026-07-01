import type { Organization } from "../../../types/perseus/Organization.ts";
import type { Institute } from "../../../types/perseus/Institute.ts";

export type Nationality = { name: string; iso_code: string };

export type ProfileOptions = {
    organizations: Organization[];
    institutes: Institute[];
    nationalities: Nationality[];
};
