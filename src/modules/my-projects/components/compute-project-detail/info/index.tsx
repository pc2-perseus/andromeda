import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
    Button,
    Card,
    CardContent,
    Divider,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";

import useIsPIorPC from "../../../hooks/useIsPIorPC.ts";
import type { MyProject } from "../../../types/project.ts";
import { formatTimeframe, remainingTime } from "../../../utils/timeframe.ts";
import StateChip from "../../StateChip.tsx";
import Person from "./Person.tsx";

export default function InformationCard({
    project,
    projectId,
}: {
    project: MyProject;
    projectId: string;
}): React.ReactElement {
    const { computeProjectId }: { computeProjectId?: string } = useParams();
    const canAccessProject = useIsPIorPC(project);
    const relativeTime = remainingTime(project.end);

    return (
        <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
                <Stack spacing={2} sx={{ height: "100%" }}>
                    <List dense disablePadding>
                        <ListItem disableGutters>
                            <ListItemText
                                primary="Scientific fields"
                                secondary={
                                    project.scientific_fields.length > 0
                                        ? project.scientific_fields
                                              .map((field) => field.name)
                                              .join(", ")
                                        : "Not available"
                                }
                            />
                        </ListItem>
                        <Divider />
                        <ListItem disableGutters>
                            <ListItemText
                                primary="Timeframe"
                                secondary={
                                    <Stack spacing={0.5}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {formatTimeframe(
                                                project.start,
                                                project.end
                                            )}
                                        </Typography>
                                        {relativeTime ? (
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {relativeTime}
                                            </Typography>
                                        ) : null}
                                    </Stack>
                                }
                                secondaryTypographyProps={{ component: "div" }}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem disableGutters>
                            <ListItemText
                                primary="Workflow states"
                                secondary={
                                    project.state_machine.current_states
                                        .length > 0 ? (
                                        <Stack
                                            direction="row"
                                            gap={0.75}
                                            flexWrap="wrap"
                                        >
                                            {project.state_machine.current_states.map(
                                                (state) => (
                                                    <StateChip
                                                        key={state}
                                                        state={state}
                                                    />
                                                )
                                            )}
                                        </Stack>
                                    ) : (
                                        "Not available"
                                    )
                                }
                                secondaryTypographyProps={{ component: "div" }}
                            />
                        </ListItem>

                        <Divider />
                        <ListItem disableGutters>
                            <ListItemText
                                primary="Principal Investigator"
                                secondary={
                                    <Person
                                        projectId={projectId}
                                        role="principal_investigator"
                                    />
                                }
                            />
                        </ListItem>
                        <Divider />
                        <ListItem disableGutters>
                            <ListItemText
                                primary="Person of Contact"
                                secondary={
                                    <Person
                                        projectId={projectId}
                                        role="person_of_contact"
                                    />
                                }
                            />
                        </ListItem>
                    </List>

                    {canAccessProject && computeProjectId ? (
                        <Button
                            component={RouterLink}
                            to={`/my-projects/${projectId}/${encodeURIComponent(
                                computeProjectId
                            )}/project-manager`}
                            size="small"
                            variant="outlined"
                            fullWidth
                            sx={{ mt: "auto" }}
                        >
                            Project manager
                        </Button>
                    ) : null}
                </Stack>
            </CardContent>
        </Card>
    );
}
