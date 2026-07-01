import React from "react";
import { TextField } from "@mui/material";
import useSubject from "../../hooks/useSubject.ts";
import useSubmitState from "../../hooks/useSubmitState.ts";
import useValidationError from "../../hooks/useValidationError.ts";

export default function Subject(): React.ReactElement {
    const { value, setValue } = useSubject();
    const { isSubmitting } = useSubmitState();
    const error = useValidationError("subject");

    return (
        <TextField
            fullWidth
            required
            label="Subject"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            helperText={error ?? "Provide a descriptive subject line."}
            error={error !== null}
            disabled={isSubmitting}
        />
    );
}
