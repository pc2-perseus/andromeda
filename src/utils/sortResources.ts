import type { Resource } from "../types/perseus/Resource.ts";
import type { Cluster } from "../types/perseus/Cluster.ts";
import { clusterMatch } from "./resourceClusterMatch.ts";

/**
 * Sorts resources based on explicit orders, cluster names and resource names.
 * @param resources
 * @param clusters
 * @param orders
 */
export default function sortResources(
    resources: Resource[],
    clusters: Cluster[],
    orders: { resource_id: string; order?: number }[] = []
): Resource[] {
    return resources.sort((r1: Resource, r2: Resource) => {
        const r1order: number =
            orders.filter(
                (item: { resource_id: string; order?: number }): boolean =>
                    item.resource_id === r1.id
            )[0]?.order ?? Number.MAX_SAFE_INTEGER;
        const r2order: number =
            orders.filter(
                (item: { resource_id: string; order?: number }): boolean =>
                    item.resource_id === r2.id
            )[0]?.order ?? Number.MAX_SAFE_INTEGER;

        const r1clusterName: string =
            clusterMatch(r1.cluster_id, clusters)?.name ?? "";
        const r2clusterName: string =
            clusterMatch(r2.cluster_id, clusters)?.name ?? "";

        const comps: number[] = [
            Math.round(r1order - r2order),
            r1clusterName.localeCompare(r2clusterName),
            r1.name.localeCompare(r2.name),
        ];

        return comps.filter((n: number): boolean => n !== 0)[0] ?? 0;
    });
}
