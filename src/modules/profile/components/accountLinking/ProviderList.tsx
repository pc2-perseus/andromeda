import React from "react";
import { Box } from "@mui/material";

import ProviderItem from "./ProviderItem";

type Provider = {
    identifier: string;
    display_name: string;
    linked: boolean;
};

type Message = {
    severity: "success" | "error";
    text: string;
};

export default function ProviderList({
    providers,
    setMessage,
}: {
    providers: Provider[];
    setMessage: (msg: Message) => void;
}): React.ReactElement {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {providers.map((provider) => (
                <ProviderItem
                    key={provider.identifier}
                    provider={provider}
                    totalLinked={providers.filter((p) => p.linked).length}
                    setMessage={setMessage}
                />
            ))}
        </Box>
    );
}
