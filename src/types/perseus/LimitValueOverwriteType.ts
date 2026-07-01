export const LimitValueOverwriteType = {
    SET_VALUE: "SET_VALUE",
} as const;

export type LimitValueOverwriteType =
    (typeof LimitValueOverwriteType)[keyof typeof LimitValueOverwriteType];
