import React from "react";
import type { ResourceContextData } from "./type.ts";
import { ResourceContext } from "./context.ts";

export default function useResources(): ResourceContextData {
    const context: ResourceContextData | undefined =
        React.useContext(ResourceContext);
    if (context === undefined) {
        throw new Error("useResources must be used within ResourceProvider");
    }

    return context;
}
