import React from "react";
import { Box, Skeleton, Stack } from "@mui/material";

export default function Loading(): React.ReactElement {
    return (
        <Stack spacing={2}>
            <Skeleton variant="rounded" height={96} />

            <Box sx={{ display: "flex", gap: 1 }}>
                <Skeleton variant="rounded" width={180} height={40} />
                <Skeleton variant="rounded" width={180} height={40} />
                <Skeleton variant="rounded" width={140} height={40} />
            </Box>

            <Skeleton variant="rounded" height={520} />
        </Stack>
    );
}
