import type { DatabaseItem } from "./DatabaseItem.ts";

export type ResourceUsageAdditionalMetric = DatabaseItem & {
    metric_id: string;
    value: number;
    contingent_factor: number;
};
