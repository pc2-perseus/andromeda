import { useProjectStore } from "../store/project.ts";
import type { Cluster } from "../../../types/perseus/Cluster.ts";
import { useShallow } from "zustand/react/shallow";

export default (): Cluster[] => {
    return useProjectStore(
        useShallow((state) => state.getSelectableClusters())
    );
};
