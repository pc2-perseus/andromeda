// React imports
import React from "react";

// MUI imports
import { InputAdornment, TextField } from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import { ABBREVIATION_MAX_LENGTH } from "../../../constants/validation.ts";
import useAbbreviation from "../../../hooks/useAbbreviation.ts";
import useIsFollowUp from "../../../hooks/useIsFollowUp.ts";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";

export default function Abbreviation(): React.ReactElement | null {
    const config = useModuleConfig();
    const errors = useValidationErrors();

    const [abbreviation, setAbbreviation] = useAbbreviation();
    const [isFollowUp] = useIsFollowUp();

    if (!config || isFollowUp) {
        return null;
    }

    const abbreviationPrefix = config.abbreviation_prefix;
    const abbreviationSuggestion =
        abbreviationPrefix !== undefined &&
        (abbreviation ?? "").startsWith(abbreviationPrefix)
            ? (abbreviation ?? "").slice(abbreviationPrefix.length)
            : (abbreviation ?? "");

    return (
        <InfoInput infoText={config.info_texts.abbreviation}>
            <TextField
                label={`Suggestion for abbreviation (max. ${ABBREVIATION_MAX_LENGTH} characters)`}
                error={"abbreviation" in errors}
                helperText={errors["abbreviation"]}
                required
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                {abbreviationPrefix}
                            </InputAdornment>
                        ),
                    },
                    htmlInput: {
                        maxLength: ABBREVIATION_MAX_LENGTH,
                        pattern: "[A-Za-z0-9]*",
                    },
                }}
                value={abbreviationSuggestion}
                onChange={(e) => setAbbreviation(e.currentTarget.value)}
                fullWidth
            />
        </InfoInput>
    );
}
