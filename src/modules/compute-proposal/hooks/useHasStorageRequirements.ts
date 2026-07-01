import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default (): [boolean, (value: boolean) => void] => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: Boolean(state.project.custom_fields.storage_requirements),
            set: state.setHasStorageRequirements,
        }))
    );

    return [value, set];
};
