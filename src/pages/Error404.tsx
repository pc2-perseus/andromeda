// React imports
import React from "react";

// MUI imports
import { Box, Typography } from "@mui/material";

export default function Error404(): React.ReactElement {
    return (
        <Box sx={{ maxWidth: "100vw", overflowX: "hidden" }}>
            <Box
                sx={{
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    mt: 5,
                }}
            >
                <Box sx={{ width: "70vw" }}>
                    <Typography variant="h1">We are sorry...</Typography>
                    <Typography variant="h3" component="div" sx={{ mt: 3 }}>
                        The page you are looking for does not exist or was
                        moved.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
