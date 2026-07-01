import React from "react";
import { Box, Typography, Alert } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import ProviderList from "./ProviderList";
import useProviders from "./hooks/useProviders";

export default function AccountLinking(): React.ReactElement {
    const [searchParams, setSearchParams] = useSearchParams();
    const { providers, loading, error, totalLinked, refresh } = useProviders();

    const [message, setMessage] = React.useState<string | null>(null);

    React.useEffect(() => {
        const linkStatus = searchParams.get("link_status");

        if (linkStatus === "success") {
            refresh();
            setMessage("Your identity was linked successfully.");

            const updatedSearchParams = new URLSearchParams(searchParams);
            updatedSearchParams.delete("link_status");
            setSearchParams(updatedSearchParams, { replace: true });
        }
    }, [refresh, searchParams, setSearchParams]);

    if (loading) return <></>;

    return (
        <Box>
            <Typography variant="h4">Account Linking</Typography>

            <Typography sx={{ mb: 2 }}>
                Link multiple login providers to your account.
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}

            <ProviderList
                providers={providers}
                totalLinked={totalLinked}
                setMessage={setMessage}
                refresh={refresh}
            />
        </Box>
    );
}
