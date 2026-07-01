import React from "react";
import { Stack, Typography } from "@mui/material";

export default function Intro(): React.ReactElement {
    return (
        <Stack spacing={1}>
            <Typography variant="h4" component="h1">
                Support Tickets
            </Typography>
            <Typography color="text.secondary">
                Please provide us with as much information as you have available
                to start. The more information and details you give us right at
                the beginning, the faster and more precisely we can help you.
            </Typography>
        </Stack>
    );
}
