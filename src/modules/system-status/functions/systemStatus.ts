import type { Cluster } from "../../../types/perseus/Cluster.ts";
import type { SystemStatusEntry } from "../../../types/perseus/SystemStatusEntry.ts";
import { SystemStatusCategory } from "../../../types/perseus/SystemStatusCategory.ts";
import type { SystemStatusService } from "../../../types/perseus/SystemStatusService.ts";
import type {
    SystemStatusGroup,
    SystemStatusServiceItem,
} from "../types/SystemStatusGroup.ts";

const ENTRY_PRIORITY = {
    RUNNING: 0,
    INFO: 1,
    WARNING: 2,
    ERROR: 3,
    PLANNED_MAINTENANCE: 4,
    CURRENT_MAINTENANCE: 5,
} as const;

export function isSystemStatusEntryCurrent(
    entry: SystemStatusEntry,
    now: Date = new Date()
): boolean {
    const time = now.getTime();
    const startTime = entry.start?.getTime() ?? Number.NEGATIVE_INFINITY;
    const endTime = entry.end?.getTime() ?? Number.POSITIVE_INFINITY;

    return startTime <= time && time <= endTime;
}

export function isSystemStatusEntryPlanned(
    entry: SystemStatusEntry,
    now: Date = new Date()
): boolean {
    return (
        (entry.category === SystemStatusCategory.MAINTENANCE ||
            entry.status_type === "planned maintenance") &&
        entry.start !== null &&
        entry.start.getTime() > now.getTime()
    );
}

function getSystemStatusEntryPriority(
    entry: SystemStatusEntry,
    now: Date = new Date()
): number {
    if (isSystemStatusEntryPlanned(entry, now)) {
        return ENTRY_PRIORITY.PLANNED_MAINTENANCE;
    }

    if (entry.category === SystemStatusCategory.MAINTENANCE) {
        if (
            isSystemStatusEntryCurrent(entry, now) ||
            doesSystemStatusEntryOverlapDay(entry, now)
        ) {
            return ENTRY_PRIORITY.CURRENT_MAINTENANCE;
        }

        return ENTRY_PRIORITY.INFO;
    }

    switch (entry.category) {
        case SystemStatusCategory.ERROR:
            return ENTRY_PRIORITY.ERROR;
        case SystemStatusCategory.WARNING:
            return ENTRY_PRIORITY.WARNING;
        case SystemStatusCategory.INFO:
            return ENTRY_PRIORITY.INFO;
        case SystemStatusCategory.RUNNING:
            return ENTRY_PRIORITY.RUNNING;
    }
}

export function isSystemStatusEntryRelevantNow(
    entry: SystemStatusEntry,
    now: Date = new Date()
): boolean {
    return (
        isSystemStatusEntryCurrent(entry, now) ||
        isSystemStatusEntryPlanned(entry, now)
    );
}

function isSystemStatusEntryRelevantForOverview(
    entry: SystemStatusEntry,
    now: Date = new Date()
): boolean {
    return (
        isSystemStatusEntryRelevantNow(entry, now) ||
        doesSystemStatusEntryOverlapDay(entry, now)
    );
}

export function getSystemStatusEntryKey(entry: SystemStatusEntry): string {
    return (
        entry._id ??
        [
            entry.title,
            entry.status_type,
            entry.start?.toISOString() ?? "",
            entry.end?.toISOString() ?? "",
        ].join("|")
    );
}

export function getSystemStatusEntryFingerprint(
    entry: SystemStatusEntry
): string {
    return JSON.stringify(entry._id);
}

export function compareSystemStatusEntries(
    left: SystemStatusEntry,
    right: SystemStatusEntry,
    getAffectedServiceCount: (entry: SystemStatusEntry) => number = (entry) =>
        entry.service_oids.length,
    now: Date = new Date()
): number {
    const categoryDifference =
        getSystemStatusEntryPriority(right, now) -
        getSystemStatusEntryPriority(left, now);
    if (categoryDifference !== 0) {
        return categoryDifference;
    }

    const leftStart = left.start?.getTime() ?? Number.NEGATIVE_INFINITY;
    const rightStart = right.start?.getTime() ?? Number.NEGATIVE_INFINITY;
    if (rightStart !== leftStart) {
        return rightStart - leftStart;
    }

    const affectedServiceDifference =
        getAffectedServiceCount(right) - getAffectedServiceCount(left);
    if (affectedServiceDifference !== 0) {
        return affectedServiceDifference;
    }

    return left.title.localeCompare(right.title);
}

export function doesSystemStatusEntryOverlapDay(
    entry: SystemStatusEntry,
    day: Date
): boolean {
    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const startTime = entry.start?.getTime() ?? Number.NEGATIVE_INFINITY;
    const endTime = entry.end?.getTime() ?? Number.POSITIVE_INFINITY;

    return startTime < dayEnd.getTime() && endTime >= dayStart.getTime();
}

export function getTopSystemStatusEntryForDay(
    entries: SystemStatusEntry[],
    day: Date
): SystemStatusEntry | null {
    const dayEntries = entries.filter((entry: SystemStatusEntry): boolean =>
        doesSystemStatusEntryOverlapDay(entry, day)
    );

    if (dayEntries.length === 0) {
        return null;
    }

    const getDayEntryPriority = (entry: SystemStatusEntry): number => {
        if (entry.category === SystemStatusCategory.MAINTENANCE) {
            return ENTRY_PRIORITY.CURRENT_MAINTENANCE;
        }

        return getSystemStatusEntryPriority(entry, day);
    };

    return [...dayEntries].sort(
        (left: SystemStatusEntry, right: SystemStatusEntry): number => {
            const categoryDifference =
                getDayEntryPriority(right) - getDayEntryPriority(left);
            if (categoryDifference !== 0) {
                return categoryDifference;
            }

            const leftStart = left.start?.getTime() ?? Number.NEGATIVE_INFINITY;
            const rightStart =
                right.start?.getTime() ?? Number.NEGATIVE_INFINITY;
            if (rightStart !== leftStart) {
                return rightStart - leftStart;
            }

            const affectedServiceDifference =
                right.service_oids.length - left.service_oids.length;
            if (affectedServiceDifference !== 0) {
                return affectedServiceDifference;
            }

            return left.title.localeCompare(right.title);
        }
    )[0];
}

export function formatSystemStatusTimeRange(entry: SystemStatusEntry): string {
    if (entry.start === null && entry.end === null) {
        return "Always active";
    }

    const formatDate = (value: Date): string =>
        value.toLocaleString("de-DE", {
            dateStyle: "medium",
            timeStyle: "short",
        });

    if (entry.start !== null && entry.end !== null) {
        return `${formatDate(entry.start)} - ${formatDate(entry.end)}`;
    }

    if (entry.start !== null) {
        return `Active since ${formatDate(entry.start)}`;
    }

    return `Active until ${formatDate(entry.end as Date)}`;
}

export function buildSystemStatusGroups(
    services: SystemStatusService[],
    entries: SystemStatusEntry[],
    clusters: Cluster[]
): SystemStatusGroup[] {
    const clusterNameMap = new Map<string, string>(
        clusters.map((cluster: Cluster): [string, string] => [
            cluster.id,
            cluster.name,
        ])
    );

    const serviceIdMap = new Map<string, SystemStatusService>();
    for (const service of services) {
        if (service._id !== null) {
            serviceIdMap.set(service._id, service);
        }
    }

    const entriesByServiceId = new Map<string, SystemStatusEntry[]>();
    const groupedServices = new Map<string, SystemStatusService[]>();
    const groupedEntries = new Map<string, Map<string, SystemStatusEntry>>();
    const groupedAffectedServiceCounts = new Map<string, Map<string, number>>();

    for (const service of services) {
        const groupKey =
            service.domain === "central_services"
                ? "central_services"
                : `cluster:${service.cluster_id ?? "unknown"}`;
        const groupServices = groupedServices.get(groupKey) ?? [];
        groupServices.push(service);
        groupedServices.set(groupKey, groupServices);
    }

    for (const entry of entries) {
        for (const serviceOid of entry.service_oids) {
            const relatedService = serviceIdMap.get(serviceOid);
            if (relatedService === undefined) {
                continue;
            }

            const serviceEntries = entriesByServiceId.get(serviceOid) ?? [];
            serviceEntries.push(entry);
            entriesByServiceId.set(serviceOid, serviceEntries);

            const groupKey =
                relatedService.domain === "central_services"
                    ? "central_services"
                    : `cluster:${relatedService.cluster_id ?? "unknown"}`;

            const entryMap = groupedEntries.get(groupKey) ?? new Map();
            entryMap.set(getSystemStatusEntryKey(entry), entry);
            groupedEntries.set(groupKey, entryMap);

            const affectedCountMap =
                groupedAffectedServiceCounts.get(groupKey) ?? new Map();
            const entryKey = getSystemStatusEntryKey(entry);
            affectedCountMap.set(
                entryKey,
                (affectedCountMap.get(entryKey) ?? 0) + 1
            );
            groupedAffectedServiceCounts.set(groupKey, affectedCountMap);
        }
    }

    return Array.from(groupedServices.entries())
        .map(([groupKey, groupServices]): SystemStatusGroup => {
            const sortedServices: SystemStatusServiceItem[] = groupServices
                .map(
                    (service: SystemStatusService): SystemStatusServiceItem => {
                        const serviceEntries = [
                            ...(entriesByServiceId.get(service._id ?? "") ??
                                []),
                        ];
                        const relevantServiceEntries = serviceEntries
                            .filter((entry: SystemStatusEntry): boolean =>
                                isSystemStatusEntryRelevantForOverview(entry)
                            )
                            .sort(compareSystemStatusEntries);

                        return {
                            service,
                            entries: serviceEntries,
                            topEntry: relevantServiceEntries[0] ?? null,
                        };
                    }
                )
                .sort(
                    (
                        left: SystemStatusServiceItem,
                        right: SystemStatusServiceItem
                    ): number =>
                        left.service.display_rank -
                            right.service.display_rank ||
                        left.service.name.localeCompare(right.service.name)
                );

            const activeEntries = Array.from(
                (groupedEntries.get(groupKey) ?? new Map()).values()
            )
                .filter((entry: SystemStatusEntry): boolean =>
                    isSystemStatusEntryRelevantForOverview(entry)
                )
                .sort(
                    (
                        left: SystemStatusEntry,
                        right: SystemStatusEntry
                    ): number =>
                        compareSystemStatusEntries(left, right, (entry) => {
                            const affectedCountMap =
                                groupedAffectedServiceCounts.get(groupKey) ??
                                new Map();
                            return (
                                affectedCountMap.get(
                                    getSystemStatusEntryKey(entry)
                                ) ?? 0
                            );
                        })
                );

            const firstService = sortedServices[0]?.service ?? null;
            const title =
                firstService?.domain === "central_services"
                    ? "Central Services"
                    : (clusterNameMap.get(firstService?.cluster_id ?? "") ??
                      firstService?.cluster_id ??
                      "Unknown Cluster");

            return {
                key: groupKey,
                title,
                domain: firstService?.domain ?? "cluster",
                services: sortedServices,
                activeEntries,
                topEntry: activeEntries[0] ?? null,
                statusChangeCount: activeEntries.length,
            };
        })
        .sort((left: SystemStatusGroup, right: SystemStatusGroup): number => {
            if (
                left.domain === "central_services" &&
                right.domain !== "central_services"
            ) {
                return 1;
            }

            if (
                left.domain !== "central_services" &&
                right.domain === "central_services"
            ) {
                return -1;
            }

            const leftRank = left.services[0]?.service.display_rank ?? 0;
            const rightRank = right.services[0]?.service.display_rank ?? 0;
            return (
                leftRank - rightRank || left.title.localeCompare(right.title)
            );
        });
}
