import React from "react";
import { Button, FormControl, FormHelperText } from "@mui/material";
import useAttachment from "../../hooks/useAttachment.ts";
import useSubmitState from "../../hooks/useSubmitState.ts";
import useValidationError from "../../hooks/useValidationError.ts";

export default function Attachment({
    handleAttachmentChange,
}: {
    handleAttachmentChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
}): React.ReactElement {
    const { attachment } = useAttachment();
    const { isSubmitting } = useSubmitState();
    const error = useValidationError("attachment");

    return (
        <FormControl fullWidth error={error !== null} disabled={isSubmitting}>
            <Button
                component="label"
                variant="outlined"
                sx={{ justifyContent: "flex-start" }}
            >
                {attachment === null
                    ? "Choose Attachment"
                    : `Attachment: ${attachment.name}`}
                <input hidden type="file" onChange={handleAttachmentChange} />
            </Button>
            <FormHelperText>
                {error ?? "Optional: maximum file size is 25 MB."}
            </FormHelperText>
        </FormControl>
    );
}
