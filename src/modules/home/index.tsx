// React imports
import React from "react";
import { useNavigate } from "react-router-dom";

// MUI imports
import { Box } from "@mui/material";

// Custom imports
import Login from "../login";
import type { AuthenticationData } from "../../types/AuthenticationData.ts";
import useAuthentication from "../../contexts/authentication";
import StatusBar from "../status-bar";
import useConfig from "../../contexts/configuration";
import type { GlobalConfiguration } from "../../types/GlobalConfiguration.ts";

export default function Home(): React.ReactElement {
    const { authData }: { authData: AuthenticationData } = useAuthentication();
    const { config }: { config: GlobalConfiguration } = useConfig();

    const navigate = useNavigate();

    React.useEffect(() => {
        if (authData.validSession) {
            navigate("/my-projects");
        }
    }, [authData.validSession, navigate]);

    return authData.validSession ? (
        <></>
    ) : (
        <Box sx={{ maxWidth: "100vw", overflowX: "hidden" }}>
            {config.enabledModules.includes("status-bar") && (
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
