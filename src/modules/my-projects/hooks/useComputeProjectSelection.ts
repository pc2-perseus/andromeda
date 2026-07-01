import { useEffect, useMemo, useState } from "react";
import type { ComputeProject } from "../../../types/perseus/ComputeProject.ts";

export default function useComputeProjectSelection(
    computeProjects: ComputeProject[]
) {
    const [selectedComputeProjectId, setSelectedComputeProjectId] = useState<
        string | null
    >(null);

    useEffect(() => {
        if (computeProjects.length === 0) {
            setSelectedComputeProjectId(null);
            return;
        }

        const selectedStillExists = computeProjects.some(
            (computeProject) =>
                computeProject.compute_project_id === selectedComputeProjectId
        );

        if (!selectedStillExists) {
            setSelectedComputeProjectId(computeProjects[0].compute_project_id);
        }
    }, [computeProjects, selectedComputeProjectId]);

    const hasComputeProjects = computeProjects.length > 0;

    const selectedComputeProject = useMemo(
        () =>
            computeProjects.find(
                (computeProject) =>
                    computeProject.compute_project_id ===
                    selectedComputeProjectId
            ) ?? null,
        [computeProjects, selectedComputeProjectId]
    );

    return {
        hasComputeProjects,
        selectedComputeProjectId,
        setSelectedComputeProjectId,
        selectedComputeProject,
    };
}
