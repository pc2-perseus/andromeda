import type { DatabaseItem } from "./DatabaseItem.ts";

export type SystemStatusService = DatabaseItem & {
    name: string;
    domain: "cluster" | "central_services";
    cluster_id: string | null;
    linked_resource_id: string | null;
    display_rank: number;
    is_active: boolean;
};
