import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default (path: string): string | null => {
    return useProjectStore(useShallow((state) => state.validationErrors[path]));
};
