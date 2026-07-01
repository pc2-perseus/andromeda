import React from "react";
import { TextField } from "@mui/material";
import useBody from "../../hooks/useBody.ts";
import useSubmitState from "../../hooks/useSubmitState.ts";
import useValidationError from "../../hooks/useValidationError.ts";

export default function Body(): React.ReactElement {
    const { value, setValue } = useBody();
    const { isSubmitting } = useSubmitState();
    const error = useValidationError("body");

    return (
        <TextField
            fullWidth
            required
            multiline
            minRows={6}
            label="Problem Description"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            helperText={
                error ??
                "Describe the problem with as much relevant detail as possible."
            }
            error={error !== null}
            disabled={isSubmitting}
        />
    );
}
