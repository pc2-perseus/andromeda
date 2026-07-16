import React from "react";
import { MenuItem, TextField } from "@mui/material";
import useMyProjectsQuery from "../../../my-projects/hooks/useMyProjectsQuery.ts";
import useProjectSelection from "../../hooks/useProjectSelection.ts";
import useIsSubmitting from "../../hooks/useIsSubmitting.ts";
import FormFieldSkeleton from "./FormFieldSkeleton.tsx";

export default function Project(): React.ReactElement {
    const {
        data: projects = [],
        isPending: loading,
        isError,
    } = useMyProjectsQuery();
    const { value, setValue } = useProjectSelection();
    const isSubmitting = useIsSubmitting();
    const projectInitRef = React.useRef(false);

    React.useEffect(() => {
        if (projects.length === 0) {
            setValue("");
            return;
        }

        const hasSelectedProject = projects.some(
            (project) => project._id === value
        );
        if (!hasSelectedProject && !projectInitRef.current) {
            setValue(projects[0]._id ?? "");
            projectInitRef.current = true;
        }
    }, [projects, setValue, value]);

    const helperText = isError
        ? "Projects could not be loaded."
        : projects.length === 0
          ? "No user-related projects are available."
          : "Projects are sorted by start date, newest first.";

    if (loading) {
        return <FormFieldSkeleton />;
    }

    return (
        <TextField
            select
            fullWidth
            label="Project"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            error={isError}
            disabled={loading || isSubmitting}
            helperText={helperText}
        >
            <MenuItem key="none" value="">
                None
            </MenuItem>
            {projects.map((project) => (
                <MenuItem key={project._id} value={project._id ?? ""}>
                    {project.abbreviation?.trim() ||
                        project.title?.trim() ||
                        "Unnamed project"}
                </MenuItem>
            ))}
        </TextField>
    );
}
