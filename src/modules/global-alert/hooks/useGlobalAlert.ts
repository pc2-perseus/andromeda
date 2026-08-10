import React from "react";
import getEntries from "../../system-status/api/getEntries.ts";
import getServices from "../../system-status/api/getServices.ts";
import {
    compareSystemStatusEntries,
    getSystemStatusEntryFingerprint,
} from "../../system-status/functions/systemStatus.ts";
import type { SystemStatusEntry } from "../../../types/perseus/SystemStatusEntry.ts";
import type { SystemStatusService } from "../../../types/perseus/SystemStatusService.ts";

const DISMISSED_ALERTS_STORAGE_KEY = "andromeda.global-alert.dismissed";
const REFRESH_INTERVAL_MS = 60_000;

function readDismissedAlertFingerprints(): string[] {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const rawValue = window.localStorage.getItem(
            DISMISSED_ALERTS_STORAGE_KEY
        );
        if (rawValue === null) {
            return [];
        }

        const parsedValue: unknown = JSON.parse(rawValue);
        return Array.isArray(parsedValue)
            ? parsedValue.filter(
                  (item: unknown): item is string => typeof item === "string"
              )
            : [];
    } catch {
        return [];
    }
}

function writeDismissedAlertFingerprints(fingerprints: string[]): void {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(
        DISMISSED_ALERTS_STORAGE_KEY,
        JSON.stringify(fingerprints)
    );
}

export default function useGlobalAlert(): {
    alert: SystemStatusEntry | null;
    affectedServices: SystemStatusService[];
    dismissAlert: () => void;
} {
    const [entries, setEntries] = React.useState<SystemStatusEntry[]>([]);
    const [services, setServices] = React.useState<SystemStatusService[]>([]);
    const [dismissedFingerprints, setDismissedFingerprints] = React.useState<
        string[]
    >(() => readDismissedAlertFingerprints());

    const load = React.useCallback(async (): Promise<void> => {
        try {
            const [nextEntries, nextServices] = await Promise.all([
                getEntries(),
                getServices(),
            ]);

            const activeGlobalAlerts = nextEntries
                .filter(
                    (entry: SystemStatusEntry): boolean => entry.global_alert
                )
                .sort(compareSystemStatusEntries);

            setEntries(activeGlobalAlerts);
            setServices(nextServices);

            const activeFingerprints = new Set(
                activeGlobalAlerts.map((entry: SystemStatusEntry): string =>
                    getSystemStatusEntryFingerprint(entry)
                )
            );

            setDismissedFingerprints((currentFingerprints: string[]) => {
                const nextFingerprints = currentFingerprints.filter(
                    (fingerprint: string): boolean =>
                        activeFingerprints.has(fingerprint)
                );
                writeDismissedAlertFingerprints(nextFingerprints);
                return nextFingerprints;
            });
        } catch {
            setEntries([]);
            setServices([]);
        }
    }, []);

    React.useEffect(() => {
        const initialLoadTimeout = window.setTimeout(() => {
            void load();
        }, 0);

        const interval = window.setInterval(() => {
            void load();
        }, REFRESH_INTERVAL_MS);

        return () => {
            window.clearTimeout(initialLoadTimeout);
            window.clearInterval(interval);
        };
    }, [load]);

    const alert = React.useMemo((): SystemStatusEntry | null => {
        return (
            entries.find(
                (entry: SystemStatusEntry): boolean =>
                    !dismissedFingerprints.includes(
                        getSystemStatusEntryFingerprint(entry)
                    )
            ) ?? null
        );
    }, [dismissedFingerprints, entries]);

    const affectedServices = React.useMemo((): SystemStatusService[] => {
        if (alert === null) {
            return [];
        }

        const serviceMap = new Map<string, SystemStatusService>();
        for (const service of services) {
            if (service._id !== null) {
                serviceMap.set(service._id, service);
            }
        }

        const currentAffectedServices = alert.service_oids
            .map((serviceOid: string): SystemStatusService | undefined =>
                serviceMap.get(serviceOid)
            )
            .filter(
                (
                    service: SystemStatusService | undefined
                ): service is SystemStatusService => service !== undefined
            );

        return [...currentAffectedServices].sort(
            (left: SystemStatusService, right: SystemStatusService): number =>
                left.display_rank - right.display_rank ||
                left.name.localeCompare(right.name)
        );
    }, [alert, services]);

    const dismissAlert = React.useCallback((): void => {
        if (alert === null) {
            return;
        }

        const fingerprint = getSystemStatusEntryFingerprint(alert);
        setDismissedFingerprints((currentFingerprints: string[]) => {
            if (currentFingerprints.includes(fingerprint)) {
                return currentFingerprints;
            }

            const nextFingerprints = [...currentFingerprints, fingerprint];
            writeDismissedAlertFingerprints(nextFingerprints);
            return nextFingerprints;
        });
    }, [alert]);

    return {
        alert,
        affectedServices,
        dismissAlert,
    };
}
