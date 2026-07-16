import React from "react";
import { Box, Typography, Alert } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import ProviderList from "./ProviderList";
import useLinkedProvidersQuery from "../../hooks/useLinkedProvidersQuery.ts";
import useLoginOptionsQuery from "../../../login/hooks/useLoginOptionsQuery.ts";
import useLinkedLoginOptions from "../../hooks/useLinkedLoginOptions.ts";

export default function AccountLinking(): React.ReactElement {
    const [searchParams, setSearchParams] = useSearchParams();
    const [message, setMessage] = React.useState<{
        severity: "success" | "error";
        text: string;
    } | null>(null);

    const {
        data: linkedProviders,
        isPending: isLinkedProvidersPending,
        isError: isLinkedProvidersError,
        refetch,
    } = useLinkedProvidersQuery();
    const {
        data: loginOptions,
        isPending: isLoginOptionsPending,
        isError: isLoginOptionsError,
    } = useLoginOptionsQuery();

    const linkedLoginOptions = useLinkedLoginOptions({
        linked: linkedProviders || [],
        options: loginOptions || [],
    });

    React.useEffect(() => {
        const linkStatus = searchParams.get("link_status");

        if (linkStatus === "success") {
            refetch();
            setMessage({
                severity: "success",
                text: "Your identity was linked successfully.",
            });

            const updatedSearchParams = new URLSearchParams(searchParams);
            updatedSearchParams.delete("link_status");
            setSearchParams(updatedSearchParams, { replace: true });
        }
    }, [refetch, searchParams, setSearchParams]);

    if (isLinkedProvidersPending || isLoginOptionsPending) {
        return <></>;
    }

    if (isLoginOptionsError || isLinkedProvidersError) {
        return (
            <Alert severity="error">
                There was an error loading your account links
            </Alert>
        );
    }

    return (
        <Box>
            <Typography variant="h4">Account Linking</Typography>

            <Typography sx={{ mb: 2 }}>
                Link multiple login providers to your account.
            </Typography>

            {message && (
                <Alert severity={message.severity}>{message.text}</Alert>
            )}

            <ProviderList
                providers={linkedLoginOptions}
                setMessage={setMessage}
            />
        </Box>
    );
}
