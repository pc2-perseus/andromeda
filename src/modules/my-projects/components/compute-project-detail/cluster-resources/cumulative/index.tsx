import React from "react";
import {
    Alert,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import useClusterResources from "../useClusterResources.ts";
import ResourcePriority from "../ResourcePriority.tsx";
import UsageProgress from "./UsageProgress.tsx";

export default function CumulativeResourcesCard(): React.ReactElement {
    const { cumulativeClusters, dangerThresholdPercent } =
        useClusterResources();

    return (
        <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Cumulative Resources
                </Typography>
                {cumulativeClusters.length > 0 ? (
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Cluster</TableCell>
                                    <TableCell>Resource</TableCell>
                                    <TableCell>Usage</TableCell>
                                    <TableCell align="right">
                                        Priority
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cumulativeClusters.flatMap((cluster) =>
                                    cluster.resources.map((resource) => (
                                        <TableRow
                                            key={`${cluster.id}-${resource.resourceId}`}
                                            hover
                                        >
                                            <TableCell>
                                                {cluster.name}
                                            </TableCell>
                                            <TableCell>
                                                {resource.name}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    minWidth: {
                                                        xs: 180,
                                                        sm: 260,
                                                    },
                                                }}
                                            >
                                                <UsageProgress
                                                    value={resource.value}
                                                    max={resource.max}
                                                    unit={resource.unit}
                                                    percent={resource.percent}
                                                    dangerThresholdPercent={
                                                        dangerThresholdPercent
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <ResourcePriority
                                                    resourceId={
                                                        resource.resourceId
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Alert severity="info">
                        No cumulative resource usage available.
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
