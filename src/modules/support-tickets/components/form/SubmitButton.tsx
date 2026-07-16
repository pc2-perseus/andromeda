import React from "react";
import { Button, CircularProgress } from "@mui/material";
import useIsSubmitting from "../../hooks/useIsSubmitting.ts";

export default function SubmitButton(): React.ReactElement {
    const isSubmitting = useIsSubmitting();

    return (
        <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={
                isSubmitting ? (
                    <CircularProgress size={18} color="inherit" />
                ) : undefined
            }
        >
            {isSubmitting ? "Submitting..." : "Send Ticket"}
        </Button>
    );
}
