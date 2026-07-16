// React imports
import React from "react";

// MUI imports
import { Box, Button, Typography } from "@mui/material";

export default function Maintenance({
    onRetry,
}: {
    onRetry?: () => void;
}): React.ReactElement {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                p: 4,
                bgcolor: "background.default",
                color: "text.primary",
            }}
        >
            <Typography variant="h4" sx={{ mb: 2 }}>
                Service Unavailable
            </Typography>
            <Typography sx={{ mb: 2, textAlign: "center" }}>
                Our authentication provider is currently unavailable.
                <br />
                Please try again later.
            </Typography>
            {onRetry && (
                <Button variant="contained" onClick={onRetry}>
                    Retry
                </Button>
            )}
        </Box>
    );
}
