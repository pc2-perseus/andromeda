export const SystemStatusCategory = {
    RUNNING: "running",
    INFO: "info",
    WARNING: "warning",
    ERROR: "error",
} as const;

export type SystemStatusCategory =
    (typeof SystemStatusCategory)[keyof typeof SystemStatusCategory];
