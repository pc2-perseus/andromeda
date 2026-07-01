// React imports
import React from "react";

// Custom imports
import type { Organization } from "../../../../types/perseus/Organization.ts";
import SearchableAutocomplete from "../../../../components/SearchableAutocomplete.tsx";
import { GERMAN_STATE_LABELS } from "../../../../utils/germanStates.ts";

export default function StateSelect({
    country,
    selected,
    onChange,
    organizations,
}: {
    country: string;
    selected: string | null;
    onChange: (newValue: string | null) => void;
    organizations: Organization[];
}): React.ReactElement {
    const states = React.useMemo(() => {
        return Array.from(
            new Set(
                organizations
                    .filter((o) => o.location?.country === country)
                    .map((o) => o.location?.state)
                    .filter((s): s is string => Boolean(s))
            )
        ).sort();
    }, [organizations, country]);

    return (
        <SearchableAutocomplete
            label="State *"
            value={selected}
            options={states}
            getOptionLabel={(option) =>
                country === "DE"
                    ? (GERMAN_STATE_LABELS[option] ?? option)
                    : option
            }
            onChange={(_e, newValue: string | null) => onChange(newValue)}
            disabled={!country}
        />
    );
}
