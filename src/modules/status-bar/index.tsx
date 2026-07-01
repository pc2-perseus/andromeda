// React imports
import React from "react";
import { useNavigate } from "react-router-dom";

// MUI imports
import { Alert, Box, Card, CardContent, Skeleton } from "@mui/material";

// Custom imports
import StatusBarCard from "./components/StatusBarCard.tsx";
import { ResourceProvider } from "../../contexts/resources/ResourceProvider.tsx";
import useSystemStatusOverview from "../system-status/hooks/useSystemStatusOverview.ts";
import { SystemStatusCategory } from "../../types/perseus/SystemStatusCategory.ts";
import useConfig from "../../contexts/configuration";
import type { GlobalConfiguration } from "../../types/GlobalConfiguration.ts";

function StatusBarContent(): React.ReactElement | null {
    const navigate = useNavigate();
    const { config }: { config: GlobalConfiguration } = useConfig();
    const { groups, loading, error } = useSystemStatusOverview();
    const showDetailsButton = config.enabledModules.includes("system-status");

    if (loading) {
        return (
            <Box
                sx={{
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(2, minmax(0, 1fr))",
                        xl: "repeat(4, minmax(0, 1fr))",
                    },
                }}
            >
                {[0, 1, 2, 3].map((item: number) => (
                    <Card key={item}>
                        <CardContent>
                            <Skeleton variant="text" width="45%" height={40} />
                            <Skeleton variant="text" width="85%" height={28} />
                            <Skeleton
                                variant="text"
                                width="55%"
                                height={28}
                                sx={{ mt: 3 }}
                            />
                        </CardContent>
                    </Card>
                ))}
            </Box>
        );
    }

    if (error !== null) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (groups.length === 0) {
        return null;
    }

    return (
        <Box
            sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                    xl: "repeat(4, minmax(0, 1fr))",
                },
            }}
        >
            {groups.map((group) => (
                <StatusBarCard
                    key={group.key}
                    name={group.title}
                    category={
                        group.topEntry?.category ?? SystemStatusCategory.RUNNING
                    }
                    message={
                        group.topEntry?.title ?? "All services up and running"
                    }
                    activeEntryCount={group.statusChangeCount}
                    onDetailsClick={
                        showDetailsButton
                            ? () => navigate("/system-status")
                            : undefined
                    }
                />
            ))}
        </Box>
    );
}

export default function StatusBar(): React.ReactElement {
    return (
        <ResourceProvider>
            <StatusBarContent />
        </ResourceProvider>
    );
}
