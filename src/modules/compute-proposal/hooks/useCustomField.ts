import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

type UnknownRecord = Record<string, unknown>;

const getByPath = (obj: unknown, path: string): unknown => {
    if (obj == null) return undefined;

    return path.split(".").reduce<unknown>((acc, key) => {
        if (acc == null || typeof acc !== "object") return undefined;
        return (acc as UnknownRecord)[key];
    }, obj);
};

export const useCustomField = <T>(path: string) => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: getByPath(state.project.custom_fields, path) as T | null,
            set: (next: T | null) => state.setCustomField(path, next),
        }))
    );

    return { value, set };
};
