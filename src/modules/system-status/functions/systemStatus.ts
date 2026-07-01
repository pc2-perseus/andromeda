import type { ChipProps } from "@mui/material";
import type { Cluster } from "../../../types/perseus/Cluster.ts";
import type { SystemStatusEntry } from "../../../types/perseus/SystemStatusEntry.ts";
import { SystemStatusCategory } from "../../../types/perseus/SystemStatusCategory.ts";
import type { SystemStatusService } from "../../../types/perseus/SystemStatusService.ts";
import type {
    SystemStatusGroup,
    SystemStatusServiceItem,
} from "../types/SystemStatusGroup.ts";

const CATEGORY_PRIORITY: Record<SystemStatusCategory, number> = {
    [SystemStatusCategory.RUNNING]: 0,
    [SystemStatusCategory.INFO]: 1,
    [SystemStatusCategory.WARNING]: 2,
    [SystemStatusCategory.ERROR]: 3,
};

const CATEGORY_COLORS: Record<
    SystemStatusCategory,
    NonNullable<ChipProps["color"]>
> = {
    [SystemStatusCategory.RUNNING]: "success",
    [SystemStatusCategory.INFO]: "info",
    [SystemStatusCategory.WARNING]: "warning",
    [SystemStatusCategory.ERROR]: "error",
};

export function getSystemStatusCategoryPriority(
    category: SystemStatusCategory
): number {
    return CATEGORY_PRIORITY[category];
}

export function getSystemStatusCategoryColor(
    category: SystemStatusCategory
): ChipProps["color"] {
    return CATEGORY_COLORS[category];
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
        entry.service_oids.length
): number {
    const categoryDifference =
        getSystemStatusCategoryPriority(right.category) -
        getSystemStatusCategoryPriority(left.category);
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
                        ].sort(compareSystemStatusEntries);

                        return {
                            service,
                            entries: serviceEntries,
                            topEntry: serviceEntries[0] ?? null,
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
            ).sort(
                (left: SystemStatusEntry, right: SystemStatusEntry): number =>
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
