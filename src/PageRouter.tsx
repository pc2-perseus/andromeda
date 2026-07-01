// React imports
import React from "react";
import { Routes, Route, useParams } from "react-router-dom";

// Custom imports
import Error404 from "./fundamental/Error404.tsx";
import ProtectedRoute from "./fundamental/ProtectedRoute.tsx";
import MaintenanceScreen from "./fundamental/MaintenanceScreen";
import type { GlobalConfiguration } from "./types/GlobalConfiguration.ts";
import useConfig from "./contexts/configuration";
import type { RouteElement } from "./types/RouteElement.ts";
import useAuthentication from "./contexts/authentication";

const modules = import.meta.glob("./modules/*/index.tsx", { eager: false });

function ModuleRouter(): React.ReactElement {
    const { "*": path } = useParams();

    const moduleName: string | undefined = path?.split("/")[0];

    if (moduleName === undefined) {
        return <Error404 />;
    }

    const module = modules[
        `./modules/${moduleName}/index.tsx`
    ] as () => Promise<{
        default: React.ComponentType<unknown>;
    }>;

    if (!module) {
        return <Error404 />;
    }

    const ModuleComponent = React.lazy(module);

    return (
        <React.Suspense fallback={<span>loading...</span>}>
            <ModuleComponent />
        </React.Suspense>
    );
}

const moduleRoutesFiles = import.meta.glob<{ routes: RouteElement[] }>(
    "./modules/**/routes.tsx",
    {
        eager: true,
    }
);

export default function PageRouter(): React.ReactElement {
    const { config }: { config: GlobalConfiguration } = useConfig();
    const {
        maintenance,
        reloadAuthData,
    }: {
        maintenance: boolean;
        reloadAuthData: () => void;
    } = useAuthentication();

    const moduleRoutes: { [key: string]: RouteElement[] } = {};

    for (const [path, mod] of Object.entries(moduleRoutesFiles)) {
        const match: RegExpMatchArray | null = path.match(
            /\.\/modules\/([^/]+)\//
        );
        if (match !== null) {
            moduleRoutes[match[1]] = mod.routes;
        }
    }

    const routes: RouteElement[] = Object.entries(moduleRoutes).flatMap(
        ([moduleId, routes]: [string, RouteElement[]]): RouteElement[] =>
            config.enabledModules.includes(moduleId) ? routes : []
    );

    return maintenance ? (
        <MaintenanceScreen onRetry={reloadAuthData} />
    ) : (
        <Routes>
            {routes
                .filter((route: RouteElement) => route.element !== undefined)
                .map((route: RouteElement) => {
                    const element = route.requiresLogin ? (
                        <ProtectedRoute>
                            {route.element as React.ReactElement}
                        </ProtectedRoute>
                    ) : (
                        (route.element as React.ReactElement)
                    );
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={element}
                        />
                    );
                })}
            <Route path="/module/*" element={<ModuleRouter />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}
