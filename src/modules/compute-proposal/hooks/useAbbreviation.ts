import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default (): [string | null, (value: string) => void] => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: state.project.abbreviation,
            set: state.setAbbreviation,
        }))
    );

    return [value, set];
};
