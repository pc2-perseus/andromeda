import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default () => {
    return useProjectStore(useShallow((state) => state.resources));
};
