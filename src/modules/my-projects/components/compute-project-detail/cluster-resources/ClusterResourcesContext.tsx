import React from "react";
import {
    ClusterResourcesContext,
    type ClusterResourcesContextValue,
} from "./clusterResourcesContextValue.ts";

export function ClusterResourcesProvider({
    children,
    value,
}: {
    children: React.ReactNode;
    value: ClusterResourcesContextValue;
}): React.ReactElement {
    return (
        <ClusterResourcesContext.Provider value={value}>
            {children}
        </ClusterResourcesContext.Provider>
    );
}
