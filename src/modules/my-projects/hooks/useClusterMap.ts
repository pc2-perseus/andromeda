import { useMemo } from "react";
import type { Cluster } from "../../../types/perseus/Cluster.ts";
import useResources from "../../../hooks/useResources.ts";

export default function useClusterMap() {
    const { clusters } = useResources();

    return useMemo(() => {
        const map = new Map<string, Cluster>();
        clusters.forEach((cluster) => {
            map.set(cluster.id, cluster);
        });
        return map;
    }, [clusters]);
}
