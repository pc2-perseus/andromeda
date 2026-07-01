import React from "react";
import { Alert, Container, Grid, Stack, Typography } from "@mui/material";
import { ResourceProvider } from "../../contexts/resources/ResourceProvider.tsx";
import useSystemStatusOverview from "./hooks/useSystemStatusOverview.ts";
import GroupCard from "./components/GroupCard.tsx";
import Skeleton from "./components/Skeleton.tsx";

function SystemStatusContent(): React.ReactElement {
    const { groups, entries, loading, error } = useSystemStatusOverview();

    return (
        <Container sx={{ py: 2 }}>
            <Stack spacing={2}>
                <BoxHeader entryCount={entries.length} />

                {error !== null && <Alert severity="error">{error}</Alert>}

                {loading ? (
                    <Skeleton />
                ) : groups.length === 0 ? (
                    <Alert severity="info">
                        No active system status services are available.
                    </Alert>
                ) : (
                    <Grid container spacing={2}>
                        {groups.map((group) => (
                            <Grid key={group.key} size={{ xs: 12, md: 6 }}>
                                <GroupCard group={group} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Stack>
        </Container>
    );
}

function BoxHeader({ entryCount }: { entryCount: number }): React.ReactElement {
    return (
        <Stack spacing={0.5}>
            <Typography variant="h4" component="h1">
                System Status
            </Typography>
            <Typography color="text.secondary">
                {entryCount === 0
                    ? "All services are currently up and running."
                    : `${entryCount} active status ${
                          entryCount === 1 ? "change" : "changes"
                      } across all services.`}
            </Typography>
        </Stack>
    );
}

export default function SystemStatus(): React.ReactElement {
    return (
        <ResourceProvider>
            <SystemStatusContent />
        </ResourceProvider>
    );
}
