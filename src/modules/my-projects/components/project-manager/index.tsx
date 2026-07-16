import React from "react";
import {
    alpha,
    Alert,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    Stack,
    Tab,
    Typography,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import { TabList, TabPanel } from "@mui/lab";
import { useParams } from "react-router-dom";

import useMyProjectQuery from "../../hooks/useMyProjectQuery.ts";
import Loading from "../compute-project-detail/Loading.tsx";

const TABS = [
    { label: "User management", value: "user-management" },
    { label: "Software", value: "software" },
    { label: "Reports", value: "reports" },
    { label: "Publications", value: "publications" },
    { label: "Extensions", value: "extensions" },
];

function Placeholder({ label }: { label: string }): React.ReactElement {
    return (
        <Card
            variant="outlined"
            sx={{
                borderStyle: "dashed",
            }}
        >
            <CardContent sx={{ py: 6 }}>
                <Typography color="text.secondary" textAlign="center">
                    {label} coming soon
                </Typography>
            </CardContent>
        </Card>
    );
}

export default function ProjectManager(): React.ReactElement {
    const {
        projectId,
        computeProjectId,
    }: { projectId?: string; computeProjectId?: string } = useParams();
    const {
        data: project,
        isPending,
        isError,
    } = useMyProjectQuery(projectId ?? "");
    const [selectedTab, setSelectedTab] = React.useState(TABS[0].value);

    if (isPending) {
        return (
            <Container sx={{ py: 2 }}>
                <Loading />
            </Container>
        );
    }

    if (isError) {
        return (
            <Alert severity="error">
                There was an error loading the project manager
            </Alert>
        );
    }

    if (!project) {
        return <Alert severity="error">Project not found</Alert>;
    }

    const computeProject =
        project.compute_projects.find(
            (item) => item.compute_project_id === computeProjectId
        ) ?? null;

    if (!computeProject) {
        return <Alert severity="error">Compute project not found</Alert>;
    }

    const origin = project.source
        ? `${project.source.name} #${project.source.foreign_id}`
        : "Not available";

    return (
        <Container sx={{ py: 2 }}>
            <Stack spacing={3}>
                <Grid container spacing={2} alignItems="flex-start">
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Stack spacing={0.5}>
                            <Typography variant="h4" component="h1">
                                {computeProject.compute_project_id}
                            </Typography>
                            <Typography color="text.secondary">
                                {project.title ?? "Untitled Project"}
                            </Typography>
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent={{
                                xs: "flex-start",
                                md: "flex-end",
                            }}
                            flexWrap={{ xs: "wrap", md: "nowrap" }}
                            useFlexGap
                        >
                            <Chip label={origin} variant="outlined" />
                            <Chip
                                label={
                                    project.is_active ? "Active" : "Inactive"
                                }
                                variant="outlined"
                                sx={
                                    project.is_active
                                        ? {
                                              bgcolor: (theme) =>
                                                  alpha(
                                                      theme.palette.success
                                                          .main,
                                                      0.12
                                                  ),
                                              borderColor: (theme) =>
                                                  alpha(
                                                      theme.palette.success
                                                          .main,
                                                      0.45
                                                  ),
                                              color: "success.dark",
                                          }
                                        : undefined
                                }
                            />
                        </Stack>
                    </Grid>
                </Grid>

                <TabContext value={selectedTab}>
                    <TabList
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        onChange={(_, value: string) => setSelectedTab(value)}
                        aria-label="Project manager navigation"
                    >
                        {TABS.map((tab) => (
                            <Tab
                                key={tab.value}
                                label={tab.label}
                                value={tab.value}
                            />
                        ))}
                    </TabList>

                    {TABS.map((tab) => (
                        <TabPanel
                            key={tab.value}
                            value={tab.value}
                            sx={{ px: 0 }}
                        >
                            <Placeholder label={tab.label} />
                        </TabPanel>
                    ))}
                </TabContext>
            </Stack>
        </Container>
    );
}
