// React imports
import React from "react";
import { useNavigate } from "react-router-dom";

// MUI imports
import { Box } from "@mui/material";

// Custom imports
import Login from "../login";
import StatusBar from "../status-bar";
import useConfig from "../../hooks/useConfig.ts";
import useAuth from "../../hooks/useAuth.ts";

export default function Home(): React.ReactElement {
    const auth = useAuth();
    const config = useConfig();

    const navigate = useNavigate();

    React.useEffect(() => {
        if (auth.validSession) {
            navigate("/my-projects");
        }
    }, [auth.validSession, navigate]);

    return auth.validSession ? (
        <></>
    ) : (
        <Box sx={{ maxWidth: "100vw", overflowX: "hidden" }}>
            {config.enabled_modules.includes("status-bar") && (
                <Box sx={{ px: 2, my: 2 }}>
                    <StatusBar />
                </Box>
            )}

            {/*
            <Box
                sx={{
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        width: "70vw",
                        maxWidth: "1500px",
                        mb: 5,
                    }}
                >
                    <HomeImage />
                </Box>
            </Box>
            */}
            <Login next="/my-projects" />
        </Box>
    );
}
