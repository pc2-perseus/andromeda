import { useCallback, useEffect, useState } from "react";
import type { MyProject } from "../types/project.ts";
import getProject from "../api/getProject.ts";

export default function useMyProject(id: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [project, setProject] = useState<MyProject | null>(null);

    const fetchProject = useCallback(async () => {
        setLoading(true);
        try {
            setProject(await getProject(id));
        } catch {
            setError("There was an error loading your project");
        } finally {
            setLoading(false);
        }
    }, [setProject, setLoading, setError, id]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    return {
        project,
        loading,
        error,
    };
}
