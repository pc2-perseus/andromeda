import type { RouteObject } from "react-router-dom";

export type RouteElement = RouteObject & { requiresLogin?: boolean };
