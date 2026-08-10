import React from "react";
import {
    Alert,
    Box,
    Card,
    CardContent,
    Divider,
    Typography,
} from "@mui/material";
import useClusterResources from "../useClusterResources.ts";
import SnapshotResourcePie from "./SnapshotResourcePie.tsx";

export default function SnapshotResourcesCard(): React.ReactElement {
    const { snapshotClusters } = useClusterResources();

    return (
        <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Snapshot Resources
                </Typography>
                {snapshotClusters.length > 0 ? (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "repeat(2, minmax(0, 1fr))",
                            },
                        }}
                    >
                        {snapshotClusters.map((cluster, clusterIndex) => (
                            <Box
                                key={cluster.id}
                                sx={{
                                    mt: {
                                        xs: clusterIndex > 0 ? 3 : 0,
                                        md: 0,
                                    },
                                    pt: {
                                        xs: clusterIndex > 0 ? 3 : 0,
                                        md: clusterIndex > 1 ? 3 : 0,
                                    },
                                    pl: {
                                        xs: 0,
                                        md: clusterIndex % 2 === 1 ? 3 : 0,
                                    },
                                    pr: {
                                        xs: 0,
                                        md: clusterIndex % 2 === 0 ? 3 : 0,
                                    },
                                    pb: {
                                        xs: 0,
                                        md:
                                            clusterIndex <
                                            snapshotClusters.length - 2
                                                ? 3
                                                : 0,
                                    },
                                }}
                            >
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    {cluster.name}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fit, minmax(180px, 1fr))",
                                        gap: 2,
                                        alignItems: "start",
                                    }}
                                >
                                    {cluster.resources.map((resource) => (
                                        <SnapshotResourcePie
                                            key={resource.resourceId}
                                            name={resource.name}
                                            value={resource.value}
                                            max={resource.max}
                                            unit={resource.unit}
                                        />
                                    ))}
                                </Box>
                                <Divider sx={{ mt: 2 }} />
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Alert severity="info">
                        No snapshot resource usage available.
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
