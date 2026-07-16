import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { Organization } from "../../../types/perseus/Organization.ts";
import type { Institute } from "../../../types/perseus/Institute.ts";
import type { ProfileOptions } from "../types/ProfileOptions.ts";

export default async function getProfileOptions(): Promise<ProfileOptions> {
    const affiliationResponse = await makeAPICall<{
        affiliations: { organization: Organization; institutes: Institute[] }[];
    }>(HTTPMethod.GET, "/perseus/service/AffiliationManager/all");

    const countryResponse = await makeAPICall<{
        countries: { name: string; iso_code: string }[];
    }>(HTTPMethod.GET, "/perseus/country");

    return {
        organizations: affiliationResponse.affiliations.map(
            (item) => item.organization
        ),
        institutes: affiliationResponse.affiliations
            .map((item) => item.institutes)
            .flat(),
        nationalities: countryResponse.countries.filter(
            (item) => item.iso_code !== "UNDEFINED"
        ),
    };
}
