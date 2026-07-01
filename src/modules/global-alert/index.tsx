import React from "react";
import { Box } from "@mui/material";
import Banner from "./components/Banner.tsx";
import useGlobalAlert from "./hooks/useGlobalAlert.ts";

export default function GlobalAlert(): React.ReactElement | null {
    const { alert, affectedServices, dismissAlert } = useGlobalAlert();

    if (alert === null) {
        return null;
    }

    return (
        <Box
            sx={{
                px: 2,
                pt: 2,
            }}
        >
            <Banner
                alert={alert}
                affectedServices={affectedServices}
                onClose={dismissAlert}
            />
        </Box>
    );
}
