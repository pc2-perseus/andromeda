import React from "react";
import fetchResourceData from "./fetchResourceData.ts";
import { ResourceContext } from "./context.ts";
import type { Cluster } from "../../types/perseus/Cluster.ts";
import type { Resource } from "../../types/perseus/Resource.ts";
import type { Limit } from "../../types/perseus/Limit.ts";

export function ResourceProvider({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement {
    const [resourceData, setResourceData] = React.useState<{
        clusters: Cluster[];
        resources: Resource[];
        limits: Limit[];
    }>({
        clusters: [],
        resources: [],
        limits: [],
    });
    const [loading, setLoading] = React.useState<boolean>(true);

    function loadResourceData() {
        setLoading(true);
        fetchResourceData()
            .then(
                (data: {
                    clusters: Cluster[];
                    resources: Resource[];
                    limits: Limit[];
                }) => {
                    setResourceData(data);
                }
            )
            .finally(() => setLoading(false));
    }

    React.useEffect(() => {
        loadResourceData();
    }, []);

    return (
        <ResourceContext.Provider
            value={{
                resourceData,
                loading,
                reloadResourceData: loadResourceData,
            }}
        >
            {children}
        </ResourceContext.Provider>
    );
}
