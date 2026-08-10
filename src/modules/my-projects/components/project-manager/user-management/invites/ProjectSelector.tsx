import React from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
} from "@mui/material";

import type { ComputeProject } from "../../../../../../types/perseus/ComputeProject.ts";

export default function ProjectSelector({
    value,
    computeProjects,
    label,
    onChange,
}: {
    value: string;
    computeProjects: ComputeProject[];
    label: string;
    onChange: (value: string) => void;
}): React.ReactElement {
    return (
        <FormControl size="small" sx={{ minWidth: 190 }}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={(event: SelectChangeEvent) =>
                    onChange(event.target.value)
                }
            >
                {computeProjects.map((computeProject) => (
                    <MenuItem
                        key={computeProject.compute_project_id}
                        value={computeProject.compute_project_id}
                    >
                        {computeProject.compute_project_id}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
