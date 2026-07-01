import React from "react";
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { MyProject } from "../../types/project.ts";
import ProjectAvatar from "../ProjectAvatar.tsx";

export default function Header({
    project,
}: {
    project: MyProject;
}): React.ReactElement {
    const { title, project_type, source } = project;
    const currentStates = project.state_machine?.current_states ?? [];

    return (
        <Card>
            <CardContent
                sx={{
                    display: "flex",
                    gap: 2,
                }}
            >
                <ProjectAvatar type={project_type ?? ""} />
                <Stack>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                        }}
                    >
                        <Typography component="h1" variant={"h5"}>
                            {title ?? "Untitled project"}
                        </Typography>
                        <Chip
                            label={project.is_active ? "Active" : "Inactive"}
                            size="small"
                            color={project.is_active ? "success" : "default"}
                            variant={project.is_active ? "filled" : "outlined"}
                        />
                        {currentStates.map((state) => (
                            <Chip
                                key={state}
                                label={state}
                                size="small"
                                variant="outlined"
                            />
                        ))}
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                        {source === null
                            ? "Source information unavailable"
                            : `#${source.foreign_id} (${source.name})`}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}
