import type { RouteElement } from "../../types/RouteElement.ts";
import Detail from "./components/detail";
import List from "./index.tsx";

export const routes: RouteElement[] = [
    {
        path: "/my-projects",
        element: <List />,
        requiresLogin: true,
    },
    {
        path: "/my-projects/:projectId",
        element: <Detail />,
        requiresLogin: true,
    },
];
