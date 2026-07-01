import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default (): [string | null, (value: string) => void] => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: state.project._id,
            set: state.setId,
        }))
    );

    return [value, set];
};
