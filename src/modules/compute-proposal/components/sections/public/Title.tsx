// React imports
import React from "react";

// MUI imports
import { TextField } from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import usePublicTitle from "../../../hooks/usePublicTitle.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";

const MAX_TITLE_LENGTH = 150;

export default function Title(): React.ReactElement | null {
    const config = useModuleConfig();
    const errors = useValidationErrors();

    const [title, setPublicTitle] = usePublicTitle();

    if (!config) {
        return null;
    }

    return (
        <InfoInput infoText={config.info_texts.public_title}>
            <TextField
                label={`Public title (max. ${MAX_TITLE_LENGTH} characters)`}
                value={title ?? ""}
                error={
                    "custom_fields.additional_description.public_title" in
                    errors
                }
                helperText={
                    errors[
                        "custom_fields.additional_description.public_title"
                    ] ?? undefined
                }
                slotProps={{
                    htmlInput: {
                        maxLength: MAX_TITLE_LENGTH,
                    },
                }}
                required
                onChange={(e) => setPublicTitle(e.currentTarget.value)}
                fullWidth
            />
        </InfoInput>
    );
}
