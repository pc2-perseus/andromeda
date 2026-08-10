// React imports
import React from "react";
import { useNavigate } from "react-router-dom";

// MUI imports
import { Alert, Box, Card, CardContent, Skeleton } from "@mui/material";

import StatusBarGroupCard from "./components/StatusBarGroupCard.tsx";
import useEntriesQuery from "../system-status/hooks/useEntriesQuery.ts";
import useServicesQuery from "../system-status/hooks/useServicesQuery.ts";
import useSystemStatusGroups from "../system-status/hooks/useSystemStatusGroups.ts";
import useConfig from "../../hooks/useConfig.ts";

function StatusBarContent(): React.ReactElement | null {
    const navigate = useNavigate();
    const config = useConfig();
    const showDetailsButton = config.enabled_modules.includes("system-status");

    const {
        data: entries,
        isPending: isEntriesPending,
        isError: isEntriesError,
    } = useEntriesQuery();
    const {
        data: services,
        isPending: isServicesPending,
        isError: isServicesError,
    } = useServicesQuery();
    const groups = useSystemStatusGroups({
        entries: entries || [],
        services: services || [],
    });

    if (isEntriesPending || isServicesPending) {
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

    if (isEntriesError || isServicesError) {
        return (
            <Alert severity="error">
                There was an error loading system status entries
            </Alert>
        );
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
            {groups.map((group) => {
                return (
                    <StatusBarGroupCard
                        key={group.key}
                        group={group}
                        onDetailsClick={
                            showDetailsButton
                                ? () => navigate("/system-status")
                                : undefined
                        }
                    />
                );
            })}
        </Box>
    );
}

export default function StatusBar(): React.ReactElement {
    return <StatusBarContent />;
}
