import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default (): [
    { [key: string]: boolean },
    (id: string, value: boolean) => void,
] => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: state.project.custom_fields.checkboxes as {
                [key: string]: boolean;
            },
            set: state.setCheckbox,
        }))
    );

    return [value ?? {}, set];
};
