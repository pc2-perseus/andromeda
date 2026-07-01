import React from "react";
import {
    Alert,
    Box,
    Divider,
    LinearProgress,
    Stack,
    Typography,
} from "@mui/material";
import type { MyProject } from "../../../types/project.ts";
import type { ComputeProject } from "../../../../../types/perseus/ComputeProject.ts";
import useUsedContingents from "../../../hooks/useUsedContingents.ts";
import useClusterMap from "../../../hooks/useClusterMap.ts";
import useResourceMap from "../../../hooks/useResourceMap.ts";
import useClusterResourceGroups from "../../../hooks/useClusterResourceGroups.ts";
import useClusterResourcesDangerThreshold from "../../../hooks/useClusterResourcesDangerThreshold.ts";
import ClusterResourcesSkeleton from "./ClusterResourcesSkeleton.tsx";
import ResourcePriority from "./ResourcePriority.tsx";

function formatNumber(value: number): string {
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: value < 10 ? 2 : 0,
    }).format(value);
}

export default function ClusterResources({
    project,
    computeProject,
}: {
    project: MyProject;
    computeProject: ComputeProject;
}): React.ReactElement {
    if (!project._id) {
        throw new Error("Project must have an ID");
    }

    const clusterMap = useClusterMap();
    const resourceMap = useResourceMap();

    const dangerThreshold = useClusterResourcesDangerThreshold();
    const dangerThresholdPercent = dangerThreshold * 100;

    const { usedContingents, loading, error } = useUsedContingents(
        project._id,
        computeProject.compute_project_id
    );
    const { clusterIds, clusters } = useClusterResourceGroups({
        usedContingents,
        grantedResources: project.granted_resources,
        computeProjectId: computeProject.compute_project_id,
        resourceMap,
        clusterNameForId: (clusterId) =>
            clusterMap.get(clusterId)?.name ?? clusterId,
    });

    if (loading) {
        return <ClusterResourcesSkeleton />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (clusterIds.length === 0) {
        return (
            <Alert severity="info">No cluster resource usage available.</Alert>
        );
    }

    return (
        <Stack spacing={3}>
            {clusters.map((cluster, clusterIndex) => {
                return (
                    <Box key={cluster.id}>
                        {clusterIndex > 0 ? <Divider sx={{ mb: 2 }} /> : null}
                        <Typography variant="h6" sx={{ mb: 1.5 }}>
                            {cluster.name}
                        </Typography>
                        <Stack spacing={1.5}>
                            {cluster.resources.map((resource) => (
                                <Box key={resource.resourceId}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: 2,
                                            mb: 0.5,
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <Typography variant="body2">
                                                {resource.name}
                                            </Typography>
                                            <ResourcePriority
                                                grantedResources={
                                                    project.granted_resources
                                                }
                                                resourceId={resource.resourceId}
                                                computeProjectId={
                                                    computeProject.compute_project_id
                                                }
                                            />
                                        </Stack>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {formatNumber(resource.value)} /{" "}
                                            {formatNumber(resource.max)}
                                            {resource.unit}
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={resource.percent}
                                        color={
                                            resource.percent >=
                                            dangerThresholdPercent
                                                ? "error"
                                                : "primary"
                                        }
                                        sx={{ height: 8, borderRadius: 4 }}
                                    />
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                );
            })}
        </Stack>
    );
}
