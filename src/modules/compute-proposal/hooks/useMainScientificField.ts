import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";
import type { ScientificField } from "../../../types/perseus/ScientificField.ts";

export default (): [
    ScientificField | null,
    (value: ScientificField | null) => void,
] => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: state.project.scientific_fields[0],
            set: state.setMainScientificField,
        }))
    );

    return [value ?? null, set];
};
