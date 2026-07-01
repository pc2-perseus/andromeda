import { useMemo } from "react";
import type { JobState } from "../../../types/perseus/JobState.ts";

export default function useJobStateColor(
    state: JobState | null
): "default" | "success" | "error" | "warning" | "info" {
    return useMemo(() => {
        switch (state) {
            case "RUNNING":
                return "success";
            case "COMPLETED":
                return "info";
            case "PENDING":
            case "SUSPENDED":
                return "warning";
            case "CANCELLED":
                return "default";
            case "BOOT_FAIL":
            case "DEADLINE":
            case "FAILED":
            case "NODE_FAIL":
            case "OUT_OF_MEMORY":
            case "PREEMPTED":
            case "TIMEOUT":
                return "error";
            default:
                return "default";
        }
    }, [state]);
}
