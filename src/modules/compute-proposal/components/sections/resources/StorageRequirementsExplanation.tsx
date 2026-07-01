// React imports
import React from "react";

// MUI imports
import { TextField } from "@mui/material";

// Custom imports
import useHasStorageRequirements from "../../../hooks/useHasStorageRequirements.ts";
import useStorageRequirements from "../../../hooks/useStorageRequirements.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";

export default function StorageRequirementsExplanation(): React.ReactElement | null {
    const errors = useValidationErrors();
    const [hasStorageRequirements] = useHasStorageRequirements();
    const [storageRequirements, setStorageRequirements] =
        useStorageRequirements();

    if (!hasStorageRequirements) {
        return null;
    }

    return (
        <TextField
            label="Explanation for special storage requirements"
            value={storageRequirements ?? ""}
            error={"custom_fields.storage_requirements" in errors}
            helperText={
                errors["custom_fields.storage_requirements"] ?? undefined
            }
            required
            multiline
            rows={7}
            onChange={(e) => setStorageRequirements(e.currentTarget.value)}
        />
    );
}
