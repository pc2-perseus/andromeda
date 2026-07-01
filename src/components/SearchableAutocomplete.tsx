import React from "react";
import { Autocomplete, TextField } from "@mui/material";

type Props<T> = {
    label: string;
    value: T | null;
    options: T[];
    getOptionLabel: (option: T) => string;
    onChange: (_: unknown, value: T | null) => void;
    disabled?: boolean;
};

export default function SearchableAutocomplete<T>({
    label,
    value,
    options,
    getOptionLabel,
    onChange,
    disabled = false,
}: Props<T>): React.ReactElement {
    return (
        <Autocomplete
            value={value}
            options={options}
            getOptionLabel={getOptionLabel}
            onChange={onChange}
            disabled={disabled}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder="Type to search..."
                />
            )}
        />
    );
}
