import React from "react";
import useAuthentication from "../../../contexts/authentication";
import useResources from "../../../contexts/resources";
import getServices from "../../system-status/api/getServices.ts";
import { buildSystemStatusGroups } from "../../system-status/functions/systemStatus.ts";
import type { SystemStatusGroup } from "../../system-status/types/SystemStatusGroup.ts";

export default function useServiceGroups(): {
    serviceGroups: SystemStatusGroup[];
    loading: boolean;
    error: string | null;
} {
    const { authData } = useAuthentication();
    const { resourceData, loading: resourceLoading } = useResources();
    const [serviceGroups, setServiceGroups] = React.useState<
        SystemStatusGroup[]
    >([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let active = true;

        async function load(): Promise<void> {
            setLoading(true);
            setError(null);

            try {
                const services = await getServices();

                if (!active) {
                    return;
                }

                setServiceGroups(
                    buildSystemStatusGroups(services, [], resourceData.clusters)
                );
            } catch {
                if (!active) {
                    return;
                }

                setServiceGroups([]);
                setError("Services could not be loaded.");
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        if (authData.validSession && !resourceLoading) {
            void load();
        }

        return () => {
            active = false;
        };
    }, [
        authData.oid,
        authData.validSession,
        resourceData.clusters,
        resourceLoading,
    ]);

    return {
        serviceGroups,
        loading: loading || resourceLoading,
        error,
    };
}
