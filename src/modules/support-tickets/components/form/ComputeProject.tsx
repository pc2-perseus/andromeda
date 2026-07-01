import React from "react";
import { MenuItem, TextField } from "@mui/material";
import type { ComputeProject as ComputeProjectType } from "../../../../types/perseus/ComputeProject.ts";
import useComputeProjectSelection from "../../hooks/useComputeProjectSelection.ts";
import useSubmitState from "../../hooks/useSubmitState.ts";

function getComputeProjectLabel(computeProject: ComputeProjectType): string {
    return computeProject.compute_project_id;
}

export default function ComputeProject({
    computeProjects,
}: {
    computeProjects: ComputeProjectType[];
}): React.ReactElement {
    const { value, setValue } = useComputeProjectSelection();
    const { isSubmitting } = useSubmitState();

    return (
        <TextField
            select
            fullWidth
            label="Compute Project"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={isSubmitting}
            helperText={
                computeProjects.length === 0
                    ? "No compute project is available for the selected project."
                    : "Select the relevant compute project."
            }
        >
            <MenuItem key="none" value="">
                None
            </MenuItem>
            {computeProjects.map((computeProject) => (
                <MenuItem
                    key={computeProject.compute_project_id}
                    value={computeProject.compute_project_id}
                >
                    {getComputeProjectLabel(computeProject)}
                </MenuItem>
            ))}
        </TextField>
    );
}
