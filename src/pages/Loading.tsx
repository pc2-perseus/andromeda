// React imports
import React from "react";

// MUI imports
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

export default function Loading(): React.ReactElement {
    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
                bgcolor: "background.default",
                color: "text.primary",
            }}
        >
            <Box
                sx={(theme) => ({
                    position: "relative",
                    width: 88,
                    height: 88,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 2,
                    bgcolor:
                        theme.palette.mode === "dark"
                            ? "rgba(20, 149, 191, 0.14)"
                            : "rgba(20, 149, 191, 0.08)",
                    border: "1px solid",
                    borderColor:
                        theme.palette.mode === "dark"
                            ? "rgba(24, 175, 225, 0.26)"
                            : "rgba(20, 149, 191, 0.22)",
                })}
            >
                <CircularProgress size={54} thickness={3.5} />
                <Box
                    sx={{
                        position: "absolute",
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        bgcolor: "secondary.main",
                    }}
                />
            </Box>
            <Stack spacing={0.75} sx={{ alignItems: "center" }}>
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ fontWeight: 700 }}
                >
                    Andromeda
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Loading workspace
                </Typography>
            </Stack>
        </Box>
    );
}
