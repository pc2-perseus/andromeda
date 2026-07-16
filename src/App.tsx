// React imports
import React, { Suspense } from "react";
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
import initializeTheme from "./fundamental/initializeTheme.ts";
import GlobalAlert from "./modules/global-alert";
import useConfigQuery from "./hooks/useConfigQuery.ts";
import useConfig from "./hooks/useConfig.ts";
import useResourcesQuery from "./hooks/useResourcesQuery.ts";
import useAuth from "./hooks/useAuth.ts";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Loading from "./pages/Loading.tsx";
import Error from "./pages/Error.tsx";

function AppLayout({
    updateMode,
}: {
    updateMode: (isDarkMode: boolean) => void;
}): React.ReactElement {
    useConfigQuery();
    useResourcesQuery();
    useAuth();

    const location = useLocation();
    const isModuleRoute = location.pathname.startsWith("/module/");
    const config = useConfig();

    return (
        <>
            {!isModuleRoute && <Navbar />}
            {config.enabled_modules.includes("global-alert") && <GlobalAlert />}
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
    }, [systemPrefersDarkMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <QueryErrorResetBoundary>
                    {({ reset }) => (
                        <ErrorBoundary
                            onReset={reset}
                            fallbackRender={(props) => <Error {...props} />}
                        >
                            <Suspense fallback={<Loading />}>
                                <AppLayout updateMode={updateMode} />
                            </Suspense>
                        </ErrorBoundary>
                    )}
                </QueryErrorResetBoundary>
            </BrowserRouter>
        </ThemeProvider>
    );
}
