import React from "react";
import type { AuthenticationContextData } from "./type.ts";

export const AuthenticationContext: React.Context<
    AuthenticationContextData | undefined
> = React.createContext<AuthenticationContextData | undefined>(undefined);
