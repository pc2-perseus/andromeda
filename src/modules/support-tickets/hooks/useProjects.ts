import React from "react";
import useAuthentication from "../../../contexts/authentication";
import getProjects from "../../my-projects/api/getProjects.ts";
import type { MyProjectListItem } from "../../my-projects/types/project.ts";

export default function useProjects(): {
    projects: MyProjectListItem[];
    loading: boolean;
    error: string | null;
} {
    const { authData } = useAuthentication();
    const [projects, setProjects] = React.useState<MyProjectListItem[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        let active = true;

        async function load(): Promise<void> {
            setLoading(true);
            setError(null);

            try {
                const nextProjects = await getProjects();

                if (!active) {
                    return;
                }

                setProjects(nextProjects);
            } catch {
                if (!active) {
                    return;
                }

                setProjects([]);
                setError("Projects could not be loaded.");
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        if (authData.validSession) {
            void load();
        }

        return () => {
            active = false;
        };
    }, [authData.oid, authData.validSession]);

    return {
        projects,
        loading,
        error,
    };
}
