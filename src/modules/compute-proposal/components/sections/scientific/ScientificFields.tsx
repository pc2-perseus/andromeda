// React imports
import React from "react";

// MUI imports
import { Typography } from "@mui/material";

// Custom imports
import ScientificField from "./ScientificField.tsx";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import useMainScientificField from "../../../hooks/useMainScientificField.ts";
import useSecondaryScientificField from "../../../hooks/useSecondaryScientificField.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";

export default function ScientificFields(): React.ReactElement | null {
    const config = useModuleConfig();
    const errors = useValidationErrors();

    const [mainScientificField, setMainScientificField] =
        useMainScientificField();
    const [secondaryScientificField, setSecondaryScientificField] =
        useSecondaryScientificField();

    if (!config) {
        return null;
    }

    return (
        <>
            <ScientificField
                label="Scientific field"
                scientificField={mainScientificField ?? null}
                onChange={setMainScientificField}
                required
            />
            {"scientific_fields" in errors && (
                <Typography color="error">
                    {errors["scientific_fields"]}
                </Typography>
            )}
            {mainScientificField && (
                <ScientificField
                    label="Secondary field"
                    scientificField={secondaryScientificField ?? null}
                    disabled={mainScientificField ? [mainScientificField] : []}
                    onChange={setSecondaryScientificField}
                />
            )}
        </>
    );
}
