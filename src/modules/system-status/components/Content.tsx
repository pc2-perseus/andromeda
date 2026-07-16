import React from "react";
import { Alert, Grid } from "@mui/material";
import GroupCard from "./GroupCard.tsx";
import Skeleton from "./Skeleton.tsx";
import useEntriesQuery from "../hooks/useEntriesQuery.ts";
import useServicesQuery from "../hooks/useServicesQuery.ts";
import useSystemStatusGroups from "../hooks/useSystemStatusGroups.ts";
import BoxHeader from "./BoxHeader.tsx";

export default function SystemStatusContent(): React.ReactElement {
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
        return <Skeleton />;
    }

    if (isEntriesError || isServicesError) {
        return (
            <Alert severity="error">
                There was an error loading system status entries
            </Alert>
        );
    }

    if (groups.length === 0) {
        return (
            <Alert severity="info">
                No active system status services are available.
            </Alert>
        );
    }

    return (
        <>
            <BoxHeader entryCount={entries.length} />

            <Grid container spacing={2}>
                {groups.map((group) => (
                    <Grid key={group.key} size={{ xs: 12, md: 6 }}>
                        <GroupCard group={group} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
