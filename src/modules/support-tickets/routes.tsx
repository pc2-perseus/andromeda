import Index from "./";
import type { RouteElement } from "../../types/RouteElement.ts";

export const routes: RouteElement[] = [
    {
        path: "/support-tickets",
        element: <Index />,
        requiresLogin: true,
    },
];
