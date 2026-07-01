import React from "react";
import { Alert } from "@mui/material";
import useSubmitState from "../../hooks/useSubmitState.ts";

export default function SubmitError(): React.ReactElement | null {
    const { error } = useSubmitState();

    if (error === null) {
        return null;
    }

    return <Alert severity="error">{error}</Alert>;
}
