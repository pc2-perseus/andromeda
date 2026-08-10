// React imports
import React from "react";
import type { FallbackProps } from "react-error-boundary";

// MUI imports
import { Box, Button, Stack, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import RefreshIcon from "@mui/icons-material/Refresh";

// Custom imports
import { APIError } from "../api/APIError.ts";
import Maintenance from "./Maintenance.tsx";

function getErrorCode(error: unknown): number | undefined {
    if (error instanceof APIError) {
        return error.code;
    }

    if (
        error !== null &&
        typeof error === "object" &&
        "status" in error &&
        typeof error.status === "number"
    ) {
        return error.status;
    }

    return undefined;
}

export default function Error({
    error,
    resetErrorBoundary,
}: FallbackProps): React.ReactElement {
    const code = getErrorCode(error);

    if (code === 503) {
        return <Maintenance onRetry={resetErrorBoundary} />;
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: 4,
                bgcolor: "background.default",
                color: "text.primary",
            }}
        >
            <Stack
                spacing={3}
                sx={{
                    width: "100%",
                    maxWidth: 520,
                    p: { xs: 3, sm: 4 },
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    bgcolor: "background.paper",
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: "center" }}
                >
                    <Box
                        sx={(theme) => ({
                            width: 48,
                            height: 48,
                            display: "grid",
                            placeItems: "center",
                            borderRadius: 2,
                            color: "error.main",
                            bgcolor:
                                theme.palette.mode === "dark"
                                    ? "rgba(244, 67, 54, 0.14)"
                                    : "rgba(211, 47, 47, 0.08)",
                        })}
                    >
                        <ErrorIcon />
                    </Box>
                    <Box>
                        <Typography
                            component="h1"
                            variant="h5"
                            sx={{ fontWeight: 700 }}
                        >
                            {code ? `Error ${code}` : "Error"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            An unexpected error occurred. Please retry the
                            request at a later time.
                        </Typography>
                    </Box>
                </Stack>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                    sx={{ justifyContent: "flex-end" }}
                >
                    <Button
                        variant="contained"
                        startIcon={<RefreshIcon />}
                        onClick={resetErrorBoundary}
                    >
                        Try again
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}
