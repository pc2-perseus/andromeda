import React from "react";
import { Box, Button, Typography, Tooltip } from "@mui/material";

import unlinkProvider from "../../api/unlinkProvider";
import CONFIG from "../../../../config";

type Props = {
    provider: {
        identifier: string;
        display_name: string;
        linked: boolean;
    };
    totalLinked: number;
    setMessage: (msg: string) => void;
    refresh: () => void;
};

export default function ProviderItem({
    provider,
    totalLinked,
    setMessage,
    refresh,
}: Props): React.ReactElement {
    const isLastProvider = provider.linked && totalLinked === 1;

    const handleConnect = () => {
        const url = new URL(`${CONFIG.GATEWAY_URL}/auth/link`);
        url.searchParams.set("kc_idp_hint", provider.identifier);
        window.location.href = url.toString();
    };

    const handleDisconnect = async () => {
        try {
            await unlinkProvider(provider.identifier);
            setMessage("Provider unlinked successfully");
            refresh();
        } catch {
            setMessage("Failed to unlink provider");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
                px: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
            }}
        >
            <Typography>{provider.display_name}</Typography>

            {provider.linked ? (
                <Tooltip
                    title={
                        isLastProvider
                            ? "You must keep at least one login method"
                            : ""
                    }
                >
                    <span>
                        <Button
                            variant="outlined"
                            color="error"
                            disabled={isLastProvider}
                            onClick={handleDisconnect}
                        >
                            Unlink
                        </Button>
                    </span>
                </Tooltip>
            ) : (
                <Button variant="contained" onClick={handleConnect}>
                    link
                </Button>
            )}
        </Box>
    );
}
