import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default (): [string | null, (value: string | null) => void] => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: state.project.project_type,
            set: state.setType,
        }))
    );

    return [value, set];
};
