import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default (): [Date | null, (value: Date | null) => void] => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: state.project.end,
            set: state.setEnd,
        }))
    );

    return [value, set];
};
