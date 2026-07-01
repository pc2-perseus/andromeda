// React imports
import React from "react";

// MUI imports
import { TextField } from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import { PROJECT_TITLE_MAX_LENGTH } from "../../../constants/validation.ts";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";
import useTitle from "../../../hooks/useTitle.ts";

export default function ProjectTitle(): React.ReactElement | null {
    const config = useModuleConfig();
    const errors = useValidationErrors();

    const [title, setTitle] = useTitle();

    if (!config) {
        return null;
    }

    const length = title.length;

    return (
        <InfoInput infoText={config.info_texts.project_title}>
            <TextField
                label={`Project title (max. ${PROJECT_TITLE_MAX_LENGTH} characters)`}
                error={"title" in errors}
                helperText={
                    errors["title"] ??
                    `${length} / ${PROJECT_TITLE_MAX_LENGTH} characters used`
                }
                required
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                slotProps={{
                    htmlInput: {
                        maxLength: PROJECT_TITLE_MAX_LENGTH,
                    },
                }}
                fullWidth
            />
        </InfoInput>
    );
}
