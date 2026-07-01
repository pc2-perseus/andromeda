// React imports
import React from "react";

// MUI imports
import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    type ListProps,
} from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import CategoryIcon from "@mui/icons-material/Category";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MemoryIcon from "@mui/icons-material/Memory";
import LabelIcon from "@mui/icons-material/Label";

// Custom imports
import type { MyProject } from "../../../types/project.ts";
import ProjectTimeframe from "../../ProjectTimeframe.tsx";

export default function InformationList({
    project,
    ...props
}: {
    project: MyProject;
} & ListProps): React.ReactElement {
    const { project_type, start, end, abbreviation } = project;

    return (
        <List {...props}>
            <ListItem>
                <ListItemIcon>
                    <LabelIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Abbreviation"
                    secondary={abbreviation ?? "Not available"}
                />
            </ListItem>

            <Divider />
            <ListItem>
                <ListItemIcon>
                    <CategoryIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Project type"
                    secondary={project_type ?? "Not available"}
                />
            </ListItem>

            <Divider />
            <ListItem>
                <ListItemIcon>
                    <ScienceIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Scientific fields"
                    secondary={
                        project.scientific_fields.length > 0
                            ? project.scientific_fields
                                  .map((f) => f.name)
                                  .join(", ")
                            : "Not available"
                    }
                />
            </ListItem>

            <ProjectTimeframe start={start} end={end} />

            <Divider />
            <ListItem>
                <ListItemIcon>
                    <MemoryIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Compute projects"
                    secondary={
                        project.compute_projects.length > 0
                            ? project.compute_projects
                                  .map((cp) => cp.compute_project_id)
                                  .join(", ")
                            : "Not available"
                    }
                />
            </ListItem>

            <Divider />
            <ListItem>
                <ListItemIcon>
                    <AccountTreeIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Current states"
                    secondary={project.state_machine.current_states.join(", ")}
                />
            </ListItem>
        </List>
    );
}
