// React imports
import React from "react";

// MUI imports
import { TextField } from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import usePublicRejectionReason from "../../../hooks/usePublicRejectionReason.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";

export default function RejectionReason(): React.ReactElement | null {
    const config = useModuleConfig();
    const errors = useValidationErrors();

    const [rejectionReason, setRejectionReason] = usePublicRejectionReason();

    if (!config) {
        return null;
    }

    return (
        <InfoInput infoText={config.info_texts.public_rejection_reason}>
            <TextField
                label="Reasons"
                value={rejectionReason ?? ""}
                error={
                    "custom_fields.additional_description.public_rejection_reason" in
                    errors
                }
                helperText={
                    errors[
                        "custom_fields.additional_description.public_rejection_reason"
                    ] ?? undefined
                }
                required
                multiline
                rows={7}
                onChange={(e) => setRejectionReason(e.currentTarget.value)}
                fullWidth
            />
        </InfoInput>
    );
}
