import type { Resource } from "../types/perseus/Resource.ts";
import type { Cluster } from "../types/perseus/Cluster.ts";

/**
 * Matches a cluster id with the corresponding cluster.
 * @param clusterId
 * @param clusters
 */
export function clusterMatch(
    clusterId: string | undefined,
    clusters: Cluster[]
): Cluster | undefined {
    try {
        return clusters.filter((c: Cluster) => c.id === clusterId)[0];
    } catch {
        return undefined;
    }
}

/**
 * Matches a resource id with the corresponding resource.
 * @param resourceId
 * @param resources
 */
export function resourceMatch(
    resourceId: string | undefined,
    resources: Resource[]
): Resource | undefined {
    try {
        return resources.filter((r: Resource) => r.id === resourceId)[0];
    } catch {
        return undefined;
    }
}

/**
 * Matches a resource id with the corresponding resource and cluster.
 * @param resourceId
 * @param resources
 * @param clusters
 */
export default function resourceClusterMatch(
    resourceId: string,
    resources: Resource[],
    clusters: Cluster[]
): { resource: Resource | undefined; cluster: Cluster | undefined } {
    const resource: Resource | undefined = resourceMatch(resourceId, resources);
    const cluster: Cluster | undefined = clusterMatch(
        resource?.cluster_id,
        clusters
    );
    return {
        resource: resource,
        cluster: cluster,
    };
}
