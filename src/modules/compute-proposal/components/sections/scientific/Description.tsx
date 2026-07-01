// React imports
import React from "react";

// MUI imports
import { TextField } from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import useDescription from "../../../hooks/useDescription.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";

export default function Description(): React.ReactElement | null {
    const config = useModuleConfig();
    const errors = useValidationErrors();

    const [description, setDescription] = useDescription();

    if (!config) {
        return null;
    }

    return (
        <InfoInput infoText={config.info_texts.description}>
            <TextField
                label="Abstract (max. 2000 characters)"
                value={description}
                helperText={
                    errors["description"] ??
                    `${(description ?? "").length} / 2000 characters used`
                }
                error={
                    "description" in errors || (description ?? "").length > 2000
                }
                required
                multiline
                rows={7}
                onChange={(e) => setDescription(e.currentTarget.value)}
                fullWidth
            />
        </InfoInput>
    );
}
