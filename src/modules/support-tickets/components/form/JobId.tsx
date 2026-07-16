import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import useJobId from "../../hooks/useJobId.ts";
import useJobOptions from "../../hooks/useJobOptions.ts";
import useIsSubmitting from "../../hooks/useIsSubmitting.ts";
import useValidationError from "../../hooks/useValidationError.ts";

export default function JobId(): React.ReactElement {
    const { value, setValue } = useJobId();
    const isSubmitting = useIsSubmitting();
    const error = useValidationError("jobIdInput");
    const {
        jobSuggestions,
        jobSuggestionsLoading,
        jobSuggestionsError,
        suggestionLimit,
    } = useJobOptions();

    const helperText =
        error ??
        jobSuggestionsError ??
        (jobSuggestionsLoading
            ? "Loading job suggestions for the selected compute project..."
            : `Suggestions show only the last up to ${suggestionLimit} jobs for the selected compute project. You can enter any job ID.`);

    return (
        <Autocomplete
            freeSolo
            options={jobSuggestions}
            value={value === "" ? null : value}
            inputValue={value}
            onChange={(_, nextValue) => setValue(nextValue ?? "")}
            onInputChange={(_, nextValue) => setValue(nextValue)}
            disabled={isSubmitting}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Job ID"
                    helperText={helperText}
                    error={error !== null}
                    inputProps={{
                        ...params.inputProps,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                    }}
                />
            )}
        />
    );
}
