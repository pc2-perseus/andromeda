// React imports
import React from "react";
import { Link as RouterLink } from "react-router-dom";

// MUI imports
import {
    Box,
    Card,
    Chip,
    ListItem as MuiListItem,
    ListItemButton,
    Stack,
    Typography,
} from "@mui/material";

// Custom imports
import type { ComputeProjectOverviewItem } from "../../types/project.ts";
import StateChip from "../StateChip.tsx";
import RecentJobsChart from "./RecentJobsChart.tsx";

export default function ListItem({
    project,
}: {
    project: ComputeProjectOverviewItem;
}): React.ReactElement {
    const {
        project_oid: projectOid,
        compute_project_id: computeProjectId,
        pending_running_jobs: pendingRunningJobs,
        recent_jobs: recentJobs,
        states,
        title,
    } = project;

    const detailUrl = `/my-projects/${projectOid}/${encodeURIComponent(
        computeProjectId
    )}`;

    return (
        <Card variant="outlined">
            <MuiListItem disablePadding>
                <ListItemButton
                    component={RouterLink}
                    to={detailUrl}
                    sx={{
                        alignItems: "stretch",
                        display: "flex",
                        minHeight: { xs: "auto", md: 260 },
                    }}
                >
                    <Stack spacing={1.5} sx={{ width: "100%", minWidth: 0 }}>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={{ xs: 1, sm: 2 }}
                        >
                            <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    noWrap
                                    sx={{
                                        fontFamily: "monospace",
                                        fontWeight: 600,
                                    }}
                                >
                                    {computeProjectId}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                    sx={{
                                        display: "-webkit-box",
                                        overflow: "hidden",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: { xs: 2, sm: 1 },
                                    }}
                                >
                                    {title ?? "Untitled Project"}
                                </Typography>
                            </Stack>

                            <Stack
                                direction="row"
                                sx={{
                                    gap: 0.5,
                                    overflowX: "auto",
                                    whiteSpace: "nowrap",
                                    "& .MuiChip-root": {
                                        flex: "0 0 auto",
                                    },
                                }}
                            >
                                {states.length === 0 ? (
                                    <Chip
                                        label="No state"
                                        size="small"
                                        variant="outlined"
                                    />
                                ) : (
                                    states.map((state) => (
                                        <StateChip key={state} state={state} />
                                    ))
                                )}
                            </Stack>
                        </Stack>

                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={{ xs: 1.5, sm: 4, md: 10 }}
                        >
                            <Box sx={{ height: 160, flex: 1, minWidth: 0 }}>
                                <RecentJobsChart jobs={recentJobs} />
                            </Box>

                            <Stack
                                sx={{
                                    textAlign: { xs: "left", sm: "right" },
                                    justifyContent: "flex-end",
                                    alignItems: {
                                        xs: "flex-start",
                                        sm: "flex-end",
                                    },
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontFamily: "monospace",
                                        fontSize: { xs: "2.25rem", md: "3rem" },
                                    }}
                                >
                                    {pendingRunningJobs.toLocaleString()}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    noWrap
                                    sx={{
                                        color: "text.secondary",
                                    }}
                                >
                                    PENDING & RUNNING JOBS
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </ListItemButton>
            </MuiListItem>
        </Card>
    );
}
