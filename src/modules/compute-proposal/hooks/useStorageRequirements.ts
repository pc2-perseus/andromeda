import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default (): [string | null, (value: string) => void] => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: state.project.custom_fields.storage_requirements as
                string | null,
            set: state.setStorageRequirements,
        }))
    );

    return [value, set];
};
