// React imports
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Custom imports
import type { AuthenticationData } from "../../types/AuthenticationData.ts";
import useAuthentication from "../../contexts/authentication";
import executeLogout from "./api/executeLogout.ts";

export default function Logout(): React.ReactElement {
    const [searchParams] = useSearchParams();
    const {
        reloadAuthData,
    }: { authData: AuthenticationData; reloadAuthData: () => void } =
        useAuthentication();

    const navigate = useNavigate();

    React.useEffect(() => {
        const next = searchParams.get("next") ?? "/";

        const logout = async () => {
            try {
                const success = await executeLogout(next);
                if (!success) {
                    console.warn(
                        "Logout request failed, forcing client logout"
                    );
                }
            } catch (error) {
                console.error("Unexpected error during logout", error);
            } finally {
                reloadAuthData();
                navigate(`/login?next=${encodeURIComponent(next)}`);
            }
        };

        logout();
    }, []);

    return <></>;
}
