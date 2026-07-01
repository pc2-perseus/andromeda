// React imports
import React from "react";

// MUI imports
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import usePurpose from "../../../hooks/usePurpose.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";

export default function Purpose(): React.ReactElement | null {
    const config = useModuleConfig();
    const errors = useValidationErrors();

    const [purpose, setPurpose] = usePurpose();

    if (!config) {
        return null;
    }

    return (
        <InfoInput infoText={config.info_texts.purpose}>
            <FormControl
                error={"custom_fields.purpose" in errors}
                required
                fullWidth
            >
                <InputLabel>Purpose</InputLabel>
                <Select
                    label="Purpose"
                    value={purpose ?? config.purposes[0] ?? ""}
                    onChange={(e) => setPurpose(e.target.value)}
                >
                    {config.purposes.map((item: string) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
                {"custom_fields.purpose" in errors && (
                    <FormHelperText>
                        {errors["custom_fields.purpose"]}
                    </FormHelperText>
                )}
            </FormControl>
        </InfoInput>
    );
}
