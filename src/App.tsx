// React imports
import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";

// MUI imports
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Custom imports
import isDarkModeActive, { setDarkMode } from "./utils/isDarkModeActive.ts";
import Navbar from "./modules/navbar";
import "./App.css";
import Footer from "./modules/footer";
import PageRouter from "./PageRouter.tsx";
import { ConfigurationProvider } from "./contexts/configuration/ConfigurationProvider.tsx";
import initializeTheme from "./fundamental/initializeTheme.ts";
import { AuthenticationProvider } from "./contexts/authentication/AuthenticationProvider.tsx";
import useAuthentication from "./contexts/authentication";
import MaintenanceScreen from "./fundamental/MaintenanceScreen.tsx";
import useConfig from "./contexts/configuration";
import type { GlobalConfiguration } from "./types/GlobalConfiguration.ts";
import GlobalAlert from "./modules/global-alert";

function AppLayout({
    updateMode,
}: {
    updateMode: (isDarkMode: boolean) => void;
}): React.ReactElement {
    const location = useLocation();
    const isModuleRoute = location.pathname.startsWith("/module/");
    const { maintenance, reloadAuthData } = useAuthentication();
    const { config }: { config: GlobalConfiguration } = useConfig();

    if (maintenance) {
        return <MaintenanceScreen onRetry={reloadAuthData} />;
    }

    return (
        <>
            {!isModuleRoute && <Navbar />}
            {config.enabledModules.includes("global-alert") && <GlobalAlert />}
            <main>
                <PageRouter />
            </main>
            {!isModuleRoute && <Footer updateMode={updateMode} />}
        </>
    );
}

export default function App(): React.ReactElement {
    const systemPrefersDarkMode: boolean = useMediaQuery(
        "(prefers-color-scheme: dark)"
    );

    const [isDarkMode, updateDarkMode] = React.useState<boolean>(
        isDarkModeActive() !== false
    );

    function updateMode(isDarkMode: boolean) {
        updateDarkMode(isDarkMode);
        setDarkMode(isDarkMode);
    }

    const theme = React.useMemo(
        () => initializeTheme(isDarkMode),
        [isDarkMode]
    );

    React.useEffect(() => {
        if (isDarkModeActive() === null) {
            setDarkMode(systemPrefersDarkMode);
        }
    }, []);

    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ConfigurationProvider>
                <ThemeProvider theme={theme}>
                    <AuthenticationProvider>
                        <CssBaseline />
                        <AppLayout updateMode={updateMode} />
                    </AuthenticationProvider>
                </ThemeProvider>
            </ConfigurationProvider>
        </BrowserRouter>
    );
}
