// React imports
import React from "react";

// Custom imports
import type { Organization } from "../../../../types/perseus/Organization.ts";
import type { Institute } from "../../../../types/perseus/Institute.ts";
import SearchableAutocomplete from "../../../../components/SearchableAutocomplete.tsx";

export default function InstituteSelect({
    organization,
    selected,
    onChange,
    institutes,
}: {
    organization: Organization | null;
    selected: Institute | null;
    onChange: (newValue: Institute | null) => void;
    institutes: Institute[];
}): React.ReactElement {
    const organizationId = organization?._id;

    const filteredInstitutes = React.useMemo(() => {
        if (!organizationId) return [];

        return institutes
            .filter((i) => i.organization_id === organizationId)
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [institutes, organizationId]);

    return (
        <SearchableAutocomplete
            label="Institute *"
            value={selected}
            options={filteredInstitutes}
            getOptionLabel={(option) => option.name}
            onChange={(_e, newValue: Institute | null) => onChange(newValue)}
            disabled={!organization}
        />
    );
}
