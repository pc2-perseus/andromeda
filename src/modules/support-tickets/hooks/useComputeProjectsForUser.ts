import React from "react";
import type { ComputeProject } from "../../../types/perseus/ComputeProject.ts";
import type { MyProject } from "../../my-projects/types/project.ts";
import { isProjectLeader } from "./projectLeader.ts";

export default function useComputeProjectsForUser(
    project: MyProject | null,
    personOid: string | null
): ComputeProject[] {
    const projectLeader = isProjectLeader(project, personOid);

    return React.useMemo((): ComputeProject[] => {
        if (project === null) {
            return [];
        }

        if (projectLeader) {
            return project.compute_projects;
        }

        if (personOid === null) {
            return [];
        }

        return project.compute_projects;
    }, [personOid, project, projectLeader]);
}
