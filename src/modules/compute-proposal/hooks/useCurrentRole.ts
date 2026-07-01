import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";
import type { Role } from "../../../types/perseus/Role.ts";

export default (): [Role | null, (role: Role | null) => void] => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: state.getCurrentRole(),
            set: state.setCurrentRole,
        }))
    );

    return [value, set];
};
