import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default (): [boolean, (value: boolean) => void] => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: Boolean(state.project.source?.is_followup),
            set: state.setIsFollowUp,
        }))
    );

    return [value, set];
};
