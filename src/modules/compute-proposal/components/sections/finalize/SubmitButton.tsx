// React imports
import React from "react";

// MUI imports
import {
    Backdrop,
    Button,
    type ButtonProps,
    CircularProgress,
} from "@mui/material";

// Custom imports
import useCurrentRole from "../../../hooks/useCurrentRole.ts";
import { useNavigate } from "react-router-dom";
import useValidate from "../../../hooks/useValidate.ts";
import useSubmit from "../../../hooks/useSubmit.ts";
import ErrorDialog from "./ErrorDialog.tsx";
import SuccessDialog from "./SuccessDialog.tsx";

export default function SubmitButton({
    ...props
}: ButtonProps): React.ReactElement {
    const navigate = useNavigate();
    const [role] = useCurrentRole();
    const { isValidating, validate } = useValidate();
    const { isSubmitting, submit } = useSubmit();

    const [success, setSuccess] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    const isDisabled = isSubmitting || isValidating;

    async function handleSubmission() {
        setError(null);
        setSuccess(false);

        const isValid = await validate();
        if (!isValid) {
            setError(
                "Some of the information you entered is invalid. Please review the highlighted fields and submit the form again."
            );
            return;
        }

        const isSubmitted = await submit();
        if (!isSubmitted) {
            setError("There was an error while submitting your proposal.");
            return;
        }

        setSuccess(true);
    }

    function handleMessageClose() {
        if (success) {
            navigate("/compute-proposal");
            setSuccess(false);
        } else {
            setError(null);
        }
    }

    return (
        <>
            <Button
                variant="contained"
                onClick={handleSubmission}
                {...props}
                disabled={props.disabled || isDisabled}
            >
                {isDisabled && <CircularProgress size={16} color="inherit" />}{" "}
                {role === "PC" ? "Send proposal to PI" : "Submit proposal"}
            </Button>

            <SuccessDialog
                isOpen={success && !error}
                onClose={handleMessageClose}
            />
            <ErrorDialog error={error} onClose={handleMessageClose} />

            <Backdrop open={isDisabled}>
                <CircularProgress />
            </Backdrop>
        </>
    );
}
