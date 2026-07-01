import { useCallback, useEffect, useState } from "react";
import type { MyProjectListItem } from "../types/project.ts";
import getProjects from "../api/getProjects.ts";

export default function useMyProjects() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [projects, setProjects] = useState<MyProjectListItem[]>([]);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            setProjects(await getProjects());
        } catch {
            setError("There was an error loading your projects");
        } finally {
            setLoading(false);
        }
    }, [setProjects, setLoading, setError]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return {
        projects,
        loading,
        error,
    };
}
