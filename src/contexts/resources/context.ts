import React from "react";
import type { ResourceContextData } from "./type.ts";

export const ResourceContext: React.Context<ResourceContextData | undefined> =
    React.createContext<ResourceContextData | undefined>(undefined);
