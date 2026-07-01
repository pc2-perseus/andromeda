import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default (): [
    {
        [key: string]: string | null;
    },
    (item: string, value: string | null) => void,
] => {
    const { value, set } = useProjectStore(
        useShallow((s) => ({
            value: s.project.custom_fields.funding as {
                [key: string]: string | null;
            },
            set: s.setFundingItem,
        }))
    );

    return [value ?? {}, set];
};
