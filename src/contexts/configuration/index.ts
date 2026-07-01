import React from "react";
import type { ConfigurationContextData } from "./type.ts";
import { ConfigurationContext } from "./context.ts";

export default function useConfig(): ConfigurationContextData {
    const context: ConfigurationContextData | undefined =
        React.useContext(ConfigurationContext);
    if (context === undefined) {
        throw new Error("useConfig must be used within ConfigurationProvider");
    }

    return context;
}
