import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default (): [
    string | null | undefined,
    (value: string | null) => void,
] => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: state.project.source?.predecessor_id,
            set: state.setPredecessorId,
        }))
    );

    return [value, set];
};
