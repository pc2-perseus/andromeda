import React from "react";
import { MenuItem, TextField } from "@mui/material";
import type { MyProjectListItem } from "../../../my-projects/types/project.ts";
import useProjectSelection from "../../hooks/useProjectSelection.ts";
import useSubmitState from "../../hooks/useSubmitState.ts";

export default function Project({
    loading,
    projects,
}: {
    loading: boolean;
    projects: MyProjectListItem[];
}): React.ReactElement {
    const { value, setValue } = useProjectSelection();
    const { isSubmitting } = useSubmitState();

    return (
        <TextField
            select
            fullWidth
            label="Project"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={loading || isSubmitting}
            helperText={
                projects.length === 0
                    ? "No user-related projects are available."
                    : "Projects are sorted by start date, newest first."
            }
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
