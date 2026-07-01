import React from "react";
import type { GlobalConfiguration } from "../../types/GlobalConfiguration.ts";
import fetchGlobalConfig from "./fetchGlobalConfig.ts";
import { ConfigurationContext } from "./context.ts";
import { Box, CircularProgress } from "@mui/material";

export function ConfigurationProvider({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement {
    const cached: string | null = localStorage.getItem(
        "andromeda.globalConfiguration"
    );
    let cachedConfig: GlobalConfiguration = {
        enabledModules: [],
        moduleConfigurations: {},
    };
    let initialLoad: boolean = true;
    if (cached !== null) {
        try {
            const cachedConfigTry: GlobalConfiguration = JSON.parse(cached);
            if (cachedConfigTry.enabledModules !== undefined) {
                cachedConfig = { ...cachedConfigTry };
                initialLoad = false;
            }
        } catch {
            /* no action required */
        }
    }

    const [config, setConfig] =
        React.useState<GlobalConfiguration>(cachedConfig);
    const [loading, setLoading] = React.useState<boolean>(initialLoad);

    function loadConfig() {
        setLoading(true);
        fetchGlobalConfig()
            .then((data: GlobalConfiguration) => {
                setConfig(data);
                localStorage.setItem(
                    "andromeda.globalConfiguration",
                    JSON.stringify(data)
                );
            })
            .finally(() => setLoading(false));
    }

    React.useEffect(() => {
        loadConfig();
    }, []);

    if (initialLoad && loading) {
        return (
            <Box
                sx={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <ConfigurationContext.Provider
            value={{ config, loading, reloadConfig: loadConfig }}
        >
            {children}
        </ConfigurationContext.Provider>
    );
}
