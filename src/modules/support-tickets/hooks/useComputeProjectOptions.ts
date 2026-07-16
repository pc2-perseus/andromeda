import React from "react";
import useMyProjectQuery from "../../my-projects/hooks/useMyProjectQuery.ts";
import useComputeProjectsForUser from "./useComputeProjectsForUser.ts";
import useComputeProjectSelection from "./useComputeProjectSelection.ts";
import useProjectSelection from "./useProjectSelection.ts";
import useAuth from "../../../hooks/useAuth.ts";

export default function useComputeProjectOptions(): {
    computeProjects: ReturnType<typeof useComputeProjectsForUser>;
    loading: boolean;
} {
    const { oid } = useAuth();
    const { value: selectedProjectOid } = useProjectSelection();
    const {
        value: selectedComputeProjectId,
        setValue: setSelectedComputeProjectId,
    } = useComputeProjectSelection();
    const computeProjectInitRef = React.useRef(false);

    const { data: selectedProject = null, isPending: selectedProjectPending } =
        useMyProjectQuery(selectedProjectOid);
    const loading = selectedProjectOid !== "" && selectedProjectPending;
    const computeProjects = useComputeProjectsForUser(selectedProject, oid);

    React.useEffect(() => {
        if (computeProjects.length === 0) {
            setSelectedComputeProjectId("");
            return;
        }

        const hasSelectedComputeProject = computeProjects.some(
            (computeProject) =>
                computeProject.compute_project_id === selectedComputeProjectId
        );
        if (!hasSelectedComputeProject && !computeProjectInitRef.current) {
            setSelectedComputeProjectId(computeProjects[0].compute_project_id);
            computeProjectInitRef.current = true;
        }
    }, [
        computeProjects,
        selectedComputeProjectId,
        setSelectedComputeProjectId,
    ]);

    return {
        computeProjects,
        loading,
    };
}
