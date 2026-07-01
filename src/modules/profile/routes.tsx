import type { RouteElement } from "../../types/RouteElement.ts";
import Profile from "./";

export const routes: RouteElement[] = [
    { path: "/profile", element: <Profile />, requiresLogin: true },
];
