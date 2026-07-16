// React imports
import React from "react";

// MUI imports
import { Box, Paper, Skeleton } from "@mui/material";

export default function FormSkeleton(): React.ReactElement {
    return (
        <Paper
            elevation={2}
            sx={{
                p: 4,
                width: "90vw",
                maxWidth: "520px",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                gap: 2,
            }}
        >
            <Skeleton
                variant="text"
                width={88}
                height={40}
                sx={{ alignSelf: "center" }}
            />
            <Skeleton
                variant="text"
                width={180}
                height={24}
                sx={{ alignSelf: "center" }}
            />

            <Skeleton variant="rounded" height={42} />

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    my: 2,
                }}
            >
                <Skeleton variant="rounded" height={1} sx={{ flex: 1 }} />
                <Skeleton variant="text" width={136} height={24} />
                <Skeleton variant="rounded" height={1} sx={{ flex: 1 }} />
            </Box>

            <Skeleton variant="rounded" height={36} />
            <Skeleton variant="rounded" height={36} />
        </Paper>
    );
}
