export const JobState = {
    BOOT_FAIL: "BOOT_FAIL",
    CANCELLED: "CANCELLED",
    COMPLETED: "COMPLETED",
    DEADLINE: "DEADLINE",
    FAILED: "FAILED",
    NODE_FAIL: "NODE_FAIL",
    OUT_OF_MEMORY: "OUT_OF_MEMORY",
    PENDING: "PENDING",
    PREEMPTED: "PREEMPTED",
    RUNNING: "RUNNING",
    SUSPENDED: "SUSPENDED",
    TIMEOUT: "TIMEOUT",
} as const;

export type JobState = (typeof JobState)[keyof typeof JobState];
