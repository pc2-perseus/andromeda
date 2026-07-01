// React imports
import React from "react";
import { Link as RouterLink } from "react-router-dom";

// MUI imports
import {
    Box,
    Card,
    Chip,
    IconButton,
    ListItem as MuiListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Custom imports
import type { MyProjectListItem } from "../../types/project.ts";
import ProjectAvatar from "../ProjectAvatar.tsx";

export default function ListItem({
    project,
    isEdge,
}: {
    project: MyProjectListItem;
    isEdge?: "top" | "bottom" | "both";
}): React.ReactElement {
    const {
        project_type: projectType,
        abbreviation,
        current_states: states,
        title,
        _id,
    } = project;

    return (
        <Card
            variant="outlined"
            sx={{
                borderTopRightRadius:
                    isEdge === "top" || isEdge === "both" ? undefined : "0px",
                borderBottomRightRadius:
                    isEdge === "bottom" || isEdge === "both"
                        ? undefined
                        : "0px",
                borderBottom:
                    isEdge === "bottom" || isEdge === "both"
                        ? undefined
                        : "none",
            }}
        >
            <MuiListItem disablePadding>
                <ListItemButton
                    component={RouterLink}
                    to={`/my-projects/${_id}`}
                    sx={{ gap: 1 }}
                >
                    <ListItemAvatar>
                        <ProjectAvatar type={projectType ?? ""} />
                    </ListItemAvatar>

                    <ListItemText
                        primary={title ?? "Untitled Project"}
                        secondary={abbreviation ?? "-"}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            gap: 0.5,
                            flexWrap: "wrap",
                            justifyContent: "flex-end",
                        }}
                    >
                        {states.map((state) => (
                            <Chip
                                key={state}
                                label={state}
                                size="small"
                                variant="outlined"
                            />
                        ))}
                    </Box>
                </ListItemButton>

                <IconButton
                    component={RouterLink}
                    to={`/my-projects/${_id}`}
                    aria-label="View project"
                >
                    <VisibilityIcon />
                </IconButton>
            </MuiListItem>
        </Card>
    );
}
