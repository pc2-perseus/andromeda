import React from "react";
import { Box, Button, Typography, Tooltip } from "@mui/material";

import CONFIG from "../../../../config";
import useUnlinkProviderMutation from "../../hooks/useUnlinkProviderMutation.ts";

type Props = {
    provider: {
        identifier: string;
        display_name: string;
        linked: boolean;
    };
    totalLinked: number;
    setMessage: (msg: { severity: "success" | "error"; text: string }) => void;
};

export default function ProviderItem({
    provider,
    totalLinked,
    setMessage,
}: Props): React.ReactElement {
    const isLastProvider = provider.linked && totalLinked === 1;
    const unlinkMutation = useUnlinkProviderMutation();

    const handleConnect = () => {
        const url = new URL(`${CONFIG.GATEWAY_URL}/auth/link`);
        url.searchParams.set("kc_idp_hint", provider.identifier);
        window.location.href = url.toString();
    };

    const handleDisconnect = async () => {
        try {
            await unlinkMutation.mutateAsync(provider.identifier);
            setMessage({
                severity: "success",
                text: "Provider unlinked successfully",
            });
        } catch {
            setMessage({
                severity: "error",
                text: "Failed to unlink provider",
            });
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
                            disabled={
                                isLastProvider || unlinkMutation.isPending
                            }
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
