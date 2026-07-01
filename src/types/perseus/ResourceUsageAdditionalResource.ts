import type { DatabaseItem } from "./DatabaseItem.ts";

export type ResourceUsageAdditionalResource = DatabaseItem & {
    resource_id: string;
    value: number;
    contingent_factor: number;
};
