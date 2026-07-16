import React from "react";
import { Stack, Typography } from "@mui/material";

export default function BoxHeader({
    entryCount,
}: {
    entryCount: number;
}): React.ReactElement {
    return (
        <Stack spacing={0.5}>
            <Typography variant="h4" component="h1">
                System Status
            </Typography>
            <Typography color="text.secondary">
                {entryCount === 0
                    ? "All services are currently up and running."
                    : `${entryCount} active status ${
                          entryCount === 1 ? "change" : "changes"
                      } across all services.`}
            </Typography>
        </Stack>
    );
}
