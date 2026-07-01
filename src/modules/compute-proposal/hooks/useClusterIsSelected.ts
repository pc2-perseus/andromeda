import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";
import type { Cluster } from "../../../types/perseus/Cluster.ts";
import { useCallback } from "react";

export default (cluster: Cluster): [boolean, (value: boolean) => void] => {
    const { value, setClusterSelected } = useProjectStore(
        useShallow((state) => ({
            value: state.isClusterSelected(cluster),
            setClusterSelected: state.setClusterSelected,
        }))
    );

    const set = useCallback(
        (value: boolean) => setClusterSelected(cluster, value),
        [setClusterSelected, cluster]
    );

    return [value, set];
};
