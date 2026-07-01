import React from "react";
import { Button, CircularProgress } from "@mui/material";
import useSubmitState from "../../hooks/useSubmitState.ts";

export default function SubmitButton({
    loading,
}: {
    loading: boolean;
}): React.ReactElement {
    const { isSubmitting } = useSubmitState();

    return (
        <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || loading}
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
