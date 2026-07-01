// React imports
import React from "react";

// Custom imports
import type { Organization } from "../../../../types/perseus/Organization.ts";
import SearchableAutocomplete from "../../../../components/SearchableAutocomplete.tsx";
import type { Nationality } from "../../types/ProfileOptions.ts";

export default function CountrySelect({
    selected,
    onChange,
    organizations,
    nationalities,
}: {
    selected: string;
    onChange: (newValue: string) => void;
    organizations: Organization[];
    nationalities: Nationality[];
}): React.ReactElement {
    const availableCountries = React.useMemo(() => {
        const orgCountries = new Set(
            organizations
                .map((o) => o.location?.country)
                .filter((c): c is string => Boolean(c))
        );

        return nationalities.filter((n) => orgCountries.has(n.iso_code));
    }, [organizations, nationalities]);

    return (
        <SearchableAutocomplete
            label="Country *"
            value={selected}
            options={availableCountries.map((c) => c.iso_code)}
            getOptionLabel={(option) =>
                availableCountries.find((c) => c.iso_code === option)?.name ??
                option
            }
            onChange={(_e, newValue: string | null) =>
                onChange(newValue ?? "DE")
            }
        />
    );
}
