import Logout from "./";
import type { RouteElement } from "../../types/RouteElement.ts";

export const routes: RouteElement[] = [
    { path: "/logout", element: <Logout /> },
];
