// React imports
import React from "react";

// MUI imports
import { Alert, AlertTitle } from "@mui/material";

// Custom imports
import useType from "../../../hooks/useType.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";

export default function Limits(): React.ReactElement | null {
    const [projectType] = useType();
    const errors = useValidationErrors();
    const keys = Object.keys(errors).filter((k) =>
        k.startsWith("resource_limits.")
    );

    if (projectType === null || keys.length === 0) {
        return null;
    }

    return (
        <Alert severity="error">
            <AlertTitle>
                Please consider the following constraint
                {keys.length > 1 && "s"} for projects of type "{projectType}
                ":
            </AlertTitle>
            <ul>
                {keys.map((key) => (
                    <li key={key}>{errors[key]}</li>
                ))}
            </ul>
        </Alert>
    );
}
