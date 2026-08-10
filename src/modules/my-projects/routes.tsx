import type { RouteElement } from "../../types/RouteElement.ts";
import ComputeProjectDetail from "./components/compute-project-detail";
import ProjectInvitation from "./components/project-invitation";
import ProjectManager from "./components/project-manager";
import List from "./index.tsx";

export const routes: RouteElement[] = [
    {
        path: "/my-projects",
        element: <List />,
        requiresLogin: true,
    },
    {
        path: "/my-projects/:projectId/:computeProjectId",
        element: <ComputeProjectDetail />,
        requiresLogin: true,
    },
    {
        path: "/my-projects/:projectId/project-manager",
        element: <ProjectManager />,
        requiresLogin: true,
    },
    {
        path: "/my-projects/:projectId/invitation/:invitationId",
        element: <ProjectInvitation />,
        requiresLogin: true,
    },
];
