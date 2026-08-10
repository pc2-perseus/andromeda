export const SystemStatusCategory = {
    RUNNING: "running",
    INFO: "info",
    WARNING: "warning",
    ERROR: "error",
    MAINTENANCE: "maintenance",
} as const;

export type SystemStatusCategory =
    (typeof SystemStatusCategory)[keyof typeof SystemStatusCategory];
