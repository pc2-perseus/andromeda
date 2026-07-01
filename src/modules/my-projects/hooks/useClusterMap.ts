import { useMemo } from "react";
import useResources from "../../../contexts/resources";
import type { Cluster } from "../../../types/perseus/Cluster.ts";

export default function useClusterMap() {
    const {
        resourceData: { clusters },
    } = useResources();

    return useMemo(() => {
        const map = new Map<string, Cluster>();
        clusters.forEach((cluster) => {
            map.set(cluster.id, cluster);
        });
        return map;
    }, [clusters]);
}
