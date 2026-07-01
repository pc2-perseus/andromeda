import { useProjectStore } from "../store/project.ts";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

export default (
    name: string
): [string | null, (value: string | null) => void] => {
    const { value, setFundingItem } = useProjectStore(
        useShallow((s) => ({
            value: s.project.custom_fields.funding?.[name],
            setFundingItem: s.setFundingItem,
        }))
    );

    const set = useCallback(
        (next: string | null) => {
            setFundingItem(name, next);
        },
        [name, setFundingItem]
    );

    return [value ?? null, set];
};
