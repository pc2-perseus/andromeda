import type { Cluster } from "../../types/perseus/Cluster.ts";
import type { Resource } from "../../types/perseus/Resource.ts";
import type { Limit } from "../../types/perseus/Limit.ts";

export type ResourceContextData = {
    resourceData: {
        clusters: Cluster[];
        resources: Resource[];
        limits: Limit[];
    };
    loading: boolean;
    reloadResourceData: () => void;
};
