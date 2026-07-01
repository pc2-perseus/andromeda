import { useShallow } from "zustand/react/shallow";
import { useProjectStore } from "../store/project.ts";

export default () => {
    return useProjectStore(
        useShallow((state) => ({
            isSaving: state.isSaving,
            save: state.save,
            error: state.saveError,
        }))
    );
};
