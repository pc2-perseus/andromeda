import type { Cluster } from "../../../types/perseus/Cluster.ts";
import useValidationErrors from "./useValidationErrors.ts";
import useSortedResources from "./useSortedResources.ts";
import { useMemo } from "react";
import useModuleConfig from "./useModuleConfig.ts";
import useType from "./useType.ts";
import useRequestedResources from "./useRequestedResources.ts";
import useResources from "./useResources.ts";

export default (cluster: Cluster) => {
    const errors = useValidationErrors();
    const resources = useSortedResources(cluster);
    const config = useModuleConfig();
    const [projectType] = useType();
    const requestedResources = useRequestedResources();
    const allResources = useResources();

    return useMemo(() => {
        const errorsNames = Object.keys(errors);
        const errorResourceIds = new Set(
            errorsNames
                .filter((e) => e.startsWith("requested_resources."))
                .map((e) => e.replace("requested_resources.", ""))
        );
        const clusterResourceIds = new Set(
            resources.map((resource) => resource.id)
        );

        if (
            !config ||
            !projectType ||
            !(projectType in config.resource_limits)
        ) {
            for (const resource of resources) {
                if (errorResourceIds.has(resource.id)) {
                    return true;
                }
            }

            return false;
        }

        const selectedClusterIds = new Set(
            requestedResources
                .map((rv) => rv.resource_id)
                .map(
                    (resourceId) =>
                        allResources.find(
                            (resource) => resource.id === resourceId
                        )?.cluster_id
                )
                .filter((clusterId): clusterId is string => Boolean(clusterId))
        );

        for (const limitItem of config.resource_limits[projectType]) {
            const hasErrorInCurrentCluster = limitItem.resource_ids.some(
                (resourceId) =>
                    clusterResourceIds.has(resourceId) &&
                    errorResourceIds.has(resourceId)
            );

            if (!hasErrorInCurrentCluster) {
                continue;
            }

            const hasOtherSelectedClusterInLimit = limitItem.resource_ids
                .filter((resourceId) => !clusterResourceIds.has(resourceId))
                .some((resourceId) => {
                    const otherResource = allResources.find(
                        (resource) => resource.id === resourceId
                    );
                    return Boolean(
                        otherResource &&
                        selectedClusterIds.has(otherResource.cluster_id)
                    );
                });

            if (!hasOtherSelectedClusterInLimit) {
                return true;
            }
        }

        return false;
    }, [
        errors,
        resources,
        config,
        projectType,
        requestedResources,
        allResources,
    ]);
};
