import React from "react";
import { Alert, Stack } from "@mui/material";
import type { MyProject } from "../../../types/project.ts";
import type { ComputeProject } from "../../../../../types/perseus/ComputeProject.ts";
import useUsedContingentsQuery from "../../../hooks/useUsedContingentsQuery.ts";
import useClusterMap from "../../../hooks/useClusterMap.ts";
import useResourceMap from "../../../hooks/useResourceMap.ts";
import useClusterResourceGroups from "../../../hooks/useClusterResourceGroups.ts";
import useClusterResourcesDangerThreshold from "../../../hooks/useClusterResourcesDangerThreshold.ts";
import { ClusterResourcesProvider } from "./ClusterResourcesContext.tsx";
import Loading from "./Loading.tsx";
import CumulativeResourcesCard from "./cumulative";
import SnapshotResourcesCard from "./snapshot";

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

    const {
        data: usedContingents,
        isPending,
        isError,
    } = useUsedContingentsQuery({
        projectId: project._id,
        computeProjectId: computeProject.compute_project_id,
    });
    const { clusterIds, clusters } = useClusterResourceGroups({
        usedContingents: usedContingents || [],
        grantedResources: project.granted_resources,
        computeProjectId: computeProject.compute_project_id,
        resourceMap,
        clusterNameForId: (clusterId) =>
            clusterMap.get(clusterId)?.name ?? clusterId,
    });

    if (isPending) {
        return <Loading />;
    }

    if (isError) {
        return (
            <Alert severity="error">
                There was an error while fetching your used contingents
            </Alert>
        );
    }

    if (clusterIds.length === 0) {
        return (
            <Alert severity="info">No cluster resource usage available.</Alert>
        );
    }

    const cumulativeClusters = clusters
        .map((cluster) => ({
            ...cluster,
            resources: cluster.resources.filter(
                (resource) => resource.resourceType === "cumulative"
            ),
        }))
        .filter((cluster) => cluster.resources.length > 0);
    const snapshotClusters = clusters
        .map((cluster) => ({
            ...cluster,
            resources: cluster.resources.filter(
                (resource) => resource.resourceType === "snapshot"
            ),
        }))
        .filter((cluster) => cluster.resources.length > 0);

    return (
        <ClusterResourcesProvider
            value={{
                cumulativeClusters,
                snapshotClusters,
                grantedResources: project.granted_resources,
                computeProjectId: computeProject.compute_project_id,
                dangerThresholdPercent,
            }}
        >
            <Stack spacing={2}>
                <CumulativeResourcesCard />
                <SnapshotResourcesCard />
            </Stack>
        </ClusterResourcesProvider>
    );
}
