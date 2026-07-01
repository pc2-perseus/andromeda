// React imports
import React from "react";

// MUI imports
import { Autocomplete, Grid, TextField } from "@mui/material";

// Custom imports
import type { ScientificField } from "../../../../../types/perseus/ScientificField.ts";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";

export default function ScientificField({
    scientificField,
    label,
    onChange,
    disabled = [],
    required = false,
}: {
    scientificField: ScientificField | null;
    label: string;
    onChange: (field: ScientificField | null) => void;
    disabled?: ScientificField[];
    required?: boolean;
}): React.ReactElement | null {
    const config = useModuleConfig();

    if (!config) {
        return null;
    }

    return (
        <Grid container spacing={1}>
            <Grid
                size={{ xs: 12, md: 2 }}
                sx={{ display: "flex", alignItems: "center" }}
            >
                {label}
                {required && <sup>*</sup>}
            </Grid>
            <Grid size={{ xs: 12, md: 10 }}>
                <Autocomplete
                    options={config.allowed_scientific_fields}
                    value={scientificField}
                    groupBy={(option) => option.research_area ?? "Other"}
                    getOptionLabel={(option) =>
                        `${option.subject_id} ${option.name ?? ""}`
                    }
                    getOptionDisabled={(option) =>
                        Boolean(
                            disabled.find(
                                (sf) => sf.subject_id === option.subject_id
                            )
                        )
                    }
                    isOptionEqualToValue={(option, value) =>
                        option.subject_id === value.subject_id
                    }
                    onChange={(_event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            required={required}
                            fullWidth
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
}
