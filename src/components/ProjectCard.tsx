// React imports
import React from "react";
import { useNavigate } from "react-router-dom";

// MUI imports
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Typography,
} from "@mui/material";

// Custom imports
import type { Project } from "../types/perseus/Project.ts";

export default function ProjectCard({
    project,
    href,
    isEdge,
}: {
    project: Project;
    href: string;
    isEdge?: "top" | "bottom" | "both" | undefined;
}): React.ReactElement {
    const navigate = useNavigate();

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
            <CardActionArea
                onClick={() => {
                    navigate(href);
                }}
            >
                <CardContent sx={{ p: 0 }}>
                    <Box sx={{ display: "flex" }}>
                        <Box
                            sx={{
                                writingMode: "vertical-lr",
                                transform: "scale(-1, -1)",
                                textAlign: "center",
                                fontSize: "19px",
                                px: 1,
                                background: undefined, // Change?
                            }}
                        >
                            {project.project_type === null ? (
                                <>&nbsp;</>
                            ) : (
                                project.project_type
                            )}
                        </Box>
                        <Box
                            sx={{
                                py: 1,
                                ml: 1,
                                flexGrow: 2,
                            }}
                        >
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                {project.source === null ? (
                                    "source information unavailable"
                                ) : (
                                    <>
                                        #{project.source.foreign_id}{" "}
                                        {project.source.name === "Andromeda"
                                            ? ""
                                            : `(${project.source.name})`}
                                    </>
                                )}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {project.abbreviation === null &&
                                project.title === null
                                    ? "no title or abbreviation available"
                                    : ""}
                                {project.abbreviation
                                    ? project.abbreviation
                                    : project.title}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                pt: "8px",
                                pr: "6px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "5px",
                            }}
                        >
                            {project.state_machine !== null &&
                                project.state_machine.current_states.map(
                                    (stateId: string) => {
                                        return (
                                            <Chip
                                                key={stateId}
                                                label={stateId}
                                                size="small"
                                                sx={{
                                                    background: undefined,
                                                }}
                                            />
                                        );
                                    }
                                )}
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
