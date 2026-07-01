import type { DatabaseItem } from "./DatabaseItem.ts";
import type { ResourceUsageAdditionalMetric } from "./ResourceUsageAdditionalMetric.ts";
import type { ResourceUsageAdditionalResource } from "./ResourceUsageAdditionalResource.ts";

export type ResourceUsage = DatabaseItem & {
    project_oid: string;
    compute_project_id: string;
    resource_id: string;
    start: string;
    end: string;
    value: number;
    contingent_factor: number;
    user: string | null;
    partition: string | null;
    priority: string | null;
    additional_metrics: ResourceUsageAdditionalMetric[];
    additional_resources: ResourceUsageAdditionalResource[];
    additional_data: { [key: string]: unknown };
};
