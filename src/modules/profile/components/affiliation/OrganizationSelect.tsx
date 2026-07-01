// React imports
import React from "react";

// Custom imports
import type { Organization } from "../../../../types/perseus/Organization.ts";
import SearchableAutocomplete from "../../../../components/SearchableAutocomplete.tsx";

export default function OrganizationSelect({
    country,
    state,
    selected,
    onChange,
    organizations,
}: {
    country: string;
    state: string | null;
    selected: Organization | null;
    onChange: (newValue: Organization | null) => void;
    organizations: Organization[];
}): React.ReactElement {
    const filteredOrganizations = React.useMemo(() => {
        return organizations
            .filter(
                (org) =>
                    org.location?.country === country &&
                    (state ? org.location?.state === state : true)
            )
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [organizations, country, state]);

    return (
        <SearchableAutocomplete
            label="Organization *"
            value={selected}
            options={filteredOrganizations}
            getOptionLabel={(option) => option.name}
            onChange={(_e, newValue: Organization | null) => onChange(newValue)}
            disabled={!state}
        />
    );
}
