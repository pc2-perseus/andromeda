import React from "react";
import { Alert, Stack, Typography } from "@mui/material";

export default function Success(): React.ReactElement {
    return (
        <Stack spacing={2}>
            <Typography variant="h4" component="h1">
                Support Tickets
            </Typography>
            <Alert severity="success">
                Your support ticket has been submitted. You will receive a
                confirmation email in a few minutes at most.
            </Alert>
        </Stack>
    );
}
