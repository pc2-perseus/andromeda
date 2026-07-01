import React from "react";
import type { ConfigurationContextData } from "./type.ts";

export const ConfigurationContext: React.Context<
    ConfigurationContextData | undefined
> = React.createContext<ConfigurationContextData | undefined>(undefined);
