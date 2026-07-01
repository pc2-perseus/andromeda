import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { Organization } from "../../../types/perseus/Organization.ts";
import type { Institute } from "../../../types/perseus/Institute.ts";
import type { ProfileOptions } from "../types/ProfileOptions.ts";

export default async function getOptions(): Promise<ProfileOptions> {
    const affiliationCall = await makeAPICall<{
        affiliations: { organization: Organization; institutes: Institute[] }[];
    }>(HTTPMethod.GET, "/perseus/service/AffiliationManager/all");

    const countryCall = await makeAPICall<{
        countries: { name: string; iso_code: string }[];
    }>(HTTPMethod.GET, "/perseus/country");

    let organizations: Organization[] = [];
    let institutes: Institute[] = [];
    let nationalities: { name: string; iso_code: string }[] = [];

    if (affiliationCall.statusCode === 200 && affiliationCall.value !== null) {
        organizations = affiliationCall.value.affiliations.map(
            (item) => item.organization
        );
        institutes = affiliationCall.value.affiliations
            .map((item) => item.institutes)
            .flat();
    }

    if (countryCall.statusCode === 200 && countryCall.value !== null) {
        nationalities = countryCall.value.countries.filter(
            (item) => item.iso_code !== "UNDEFINED"
        );
    }

    return {
        organizations: organizations,
        institutes: institutes,
        nationalities: nationalities,
    };
}
