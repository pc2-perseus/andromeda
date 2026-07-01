import SystemStatus from "./";
import type { RouteElement } from "../../types/RouteElement.ts";

export const routes: RouteElement[] = [
    {
        path: "/system-status",
        element: <SystemStatus />,
        requiresLogin: false,
    },
];
