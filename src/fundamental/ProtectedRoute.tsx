import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthentication from "../contexts/authentication";
import MaintenanceScreen from "./MaintenanceScreen";
import { CircularProgress, Box } from "@mui/material";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactElement;
}): React.ReactElement {
    const { authData, loading, maintenance } = useAuthentication();
    const location = useLocation();

    if (loading)
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    if (maintenance) return <MaintenanceScreen />;
    if (!authData.validSession) {
        return (
            <Navigate
                to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`}
                replace
            />
        );
    }
    return children;
}
