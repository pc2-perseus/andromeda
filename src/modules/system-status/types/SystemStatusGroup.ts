import type { SystemStatusEntry } from "../../../types/perseus/SystemStatusEntry.ts";
import type { SystemStatusService } from "../../../types/perseus/SystemStatusService.ts";

export type SystemStatusServiceItem = {
    service: SystemStatusService;
    entries: SystemStatusEntry[];
    topEntry: SystemStatusEntry | null;
};

export type SystemStatusGroup = {
    key: string;
    title: string;
    domain: SystemStatusService["domain"];
    services: SystemStatusServiceItem[];
    activeEntries: SystemStatusEntry[];
    topEntry: SystemStatusEntry | null;
    statusChangeCount: number;
};
