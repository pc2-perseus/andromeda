import React from "react";
import type { AuthenticationContextData } from "./type.ts";
import { AuthenticationContext } from "./context.ts";

export default function useAuthentication(): AuthenticationContextData {
    const context: AuthenticationContextData | undefined = React.useContext(
        AuthenticationContext
    );
    if (context === undefined) {
        throw new Error(
            "useAuthentication must be used within AuthenticationProvider"
        );
    }

    return context;
}
