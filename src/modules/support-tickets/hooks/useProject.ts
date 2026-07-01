import React from "react";
import getProject from "../../my-projects/api/getProject.ts";
import type { MyProject } from "../../my-projects/types/project.ts";

export default function useProject(projectOid: string): {
    project: MyProject | null;
    loading: boolean;
} {
    const [project, setProject] = React.useState<MyProject | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        let active = true;

        async function load(): Promise<void> {
            if (projectOid === "") {
                setProject(null);
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const nextProject = await getProject(projectOid);

                if (!active) {
                    return;
                }

                setProject(nextProject);
            } catch {
                if (!active) {
                    return;
                }

                setProject(null);
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        void load();

        return () => {
            active = false;
        };
    }, [projectOid]);

    return {
        project,
        loading,
    };
}
