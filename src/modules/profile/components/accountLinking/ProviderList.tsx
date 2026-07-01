import React from "react";
import { Box } from "@mui/material";

import ProviderItem from "./ProviderItem";

type Provider = {
    identifier: string;
    display_name: string;
    linked: boolean;
};

export default function ProviderList({
    providers,
    totalLinked,
    setMessage,
    refresh,
}: {
    providers: Provider[];
    totalLinked: number;
    setMessage: (msg: string) => void;
    refresh: () => void;
}): React.ReactElement {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {providers.map((provider) => (
                <ProviderItem
                    key={provider.identifier}
                    provider={provider}
                    totalLinked={totalLinked}
                    setMessage={setMessage}
                    refresh={refresh}
                />
            ))}
        </Box>
    );
}
