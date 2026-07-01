import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default (): [string | null, (value: string) => void] => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: state.project.custom_fields.professorship as string | null,
            set: state.setProfessorship,
        }))
    );

    return [value, set];
};
