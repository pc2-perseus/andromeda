// React imports
import React from "react";

// Custom imports
import fetchAuthData from "./fetchAuthData.ts";
import type { AuthenticationData } from "../../types/AuthenticationData.ts";
import { AuthenticationContext } from "./context.ts";

export function AuthenticationProvider({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement {
    const [authData, setAuthData] = React.useState<AuthenticationData>({
        oid: null,
        username: null,
        validSession: false,
        person: null,
    });
    const [loading, setLoading] = React.useState<boolean>(true);
    const [maintenance, setMaintenance] = React.useState<boolean>(false);

    function loadAuthData() {
        setLoading(true);
        setMaintenance(false);
        fetchAuthData()
            .then((data: AuthenticationData) => {
                setAuthData(data);
            })
            .catch((err) => {
                if (
                    (err as any)?.status === 503 ||
                    (err as any).message === "MAINTENANCE"
                ) {
                    setMaintenance(true);
                    setAuthData({
                        oid: null,
                        username: null,
                        validSession: false,
                        person: null,
                    });
                } else {
                    console.error("Failed to load auth data", err);
                    setAuthData({
                        oid: null,
                        username: null,
                        validSession: false,
                        person: null,
                    });
                }
            })
            .finally(() => setLoading(false));
    }

    React.useEffect(() => {
        loadAuthData();
    }, []);

    return (
        <AuthenticationContext.Provider
            value={{
                authData,
                loading,
                maintenance,
                reloadAuthData: loadAuthData,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
}
