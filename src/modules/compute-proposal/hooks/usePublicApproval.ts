import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default (): [boolean, (value: boolean) => void] => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: Boolean(state.project.custom_fields.public_approval),
            set: state.setIsPublicApproval,
        }))
    );

    return [value, set];
};
