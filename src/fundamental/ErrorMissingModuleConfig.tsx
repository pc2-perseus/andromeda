import React from "react";
import { Box, Typography } from "@mui/material";

export default function ErrorMissingModuleConfig(): React.ReactElement {
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
                        We are unable to fetch the configuration needed to
                        provide this service to you at the moment. Please try
                        again later.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
