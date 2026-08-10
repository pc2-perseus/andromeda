// React imports
import React from "react";

// MUI imports
import { Box } from "@mui/material";

// Custom imports
import Login from "../login";
import StatusBar from "../status-bar";
import useConfig from "../../hooks/useConfig.ts";

export default function Home(): React.ReactElement {
    const config = useConfig();

    return (
        <Box sx={{ maxWidth: "100vw", overflowX: "hidden" }}>
            {config.enabled_modules.includes("status-bar") && (
                <Box sx={{ px: 2, my: 2 }}>
                    <StatusBar />
                </Box>
            )}

            <Login />
        </Box>
    );
}
