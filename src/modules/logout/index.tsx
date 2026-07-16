// React imports
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Custom imports
import { useQueryClient } from "@tanstack/react-query";
import useLogoutMutation from "./hooks/useLogoutMutation.ts";

export default function Logout(): React.ReactElement {
    const [searchParams] = useSearchParams();
    const client = useQueryClient();
    const { mutate } = useLogoutMutation();

    const navigate = useNavigate();

    React.useEffect(() => {
        const next = searchParams.get("next") ?? "/";

        mutate(next, {
            onSuccess: (success) => {
                if (!success) {
                    console.warn(
                        "Logout request failed, forcing client logout"
                    );
                }
            },
            onError: (error) => {
                console.error("Unexpected error during logout", error);
            },
            onSettled: async () => {
                await client.invalidateQueries();
                navigate(`/login?next=${encodeURIComponent(next)}`);
            },
        });
    }, [client, mutate, navigate, searchParams]);

    return <></>;
}
