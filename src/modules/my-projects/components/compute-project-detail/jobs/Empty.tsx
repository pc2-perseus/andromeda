import React from "react";
import { Box, Typography } from "@mui/material";

export default function Empty(): React.ReactElement {
    return (
        <Box
            sx={{
                height: "100%",
                minHeight: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
            }}
        >
            <Typography color="text.secondary">No jobs found.</Typography>
        </Box>
    );
}
