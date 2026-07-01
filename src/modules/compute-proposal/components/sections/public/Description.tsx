// React imports
import React from "react";

// MUI imports
import { TextField } from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import usePublicDescription from "../../../hooks/usePublicDescription.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";

export default function Description(): React.ReactElement | null {
    const config = useModuleConfig();
    const errors = useValidationErrors();

    const [description, setPublicDescription] = usePublicDescription();

    if (!config) {
        return null;
    }

    return (
        <InfoInput infoText={config.info_texts.public_description}>
            <TextField
                label="Public description (max. 600 characters)"
                value={description ?? ""}
                helperText={
                    errors[
                        "custom_fields.additional_description.public_description"
                    ] ?? `${(description ?? "").length} / 600 characters used`
                }
                error={
                    "custom_fields.additional_description.public_description" in
                        errors || (description ?? "").length > 600
                }
                required
                multiline
                rows={6}
                onChange={(e) => setPublicDescription(e.currentTarget.value)}
                fullWidth
            />
        </InfoInput>
    );
}
