export const ResourceValueOverwriteType = {
    SET_PRIORITY: "SET_PRIORITY",
    SET_VALUE: "SET_VALUE",
    ADD_PARTITION: "ADD_PARTITION",
    REMOVE_PARTITION: "REMOVE_PARTITION",
} as const;

export type ResourceValueOverwriteType =
    (typeof ResourceValueOverwriteType)[keyof typeof ResourceValueOverwriteType];
