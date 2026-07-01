import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default (): [string, (value: string) => void] => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: state.project.title,
            set: state.setTitle,
        }))
    );

    return [value ?? "", set];
};
