import type { DatabaseItem } from "./DatabaseItem.ts";
import type { SystemStatusCategory } from "./SystemStatusCategory.ts";

export type SystemStatusEntry = DatabaseItem & {
    service_oids: string[];
    title: string;
    description: string;
    category: SystemStatusCategory;
    status_type: string;
    start: Date | null;
    end: Date | null;
    global_alert: boolean;
};
