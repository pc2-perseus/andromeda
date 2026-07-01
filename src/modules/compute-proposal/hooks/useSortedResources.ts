import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";
import type { Cluster } from "../../../types/perseus/Cluster.ts";

export default (cluster: Cluster) => {
    return useProjectStore(
        useShallow((state) => state.getSortedResources(cluster))
    );
};
