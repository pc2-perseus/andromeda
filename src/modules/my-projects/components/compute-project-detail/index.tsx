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
    Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import useAuth from "../../../../hooks/useAuth.ts";
import useMyProjectQuery from "../../hooks/useMyProjectQuery.ts";
import Loading from "./Loading.tsx";
import UsageChart from "./usage-chart/index.tsx";
import JobTable from "./jobs/index.tsx";
import ClusterResources from "./cluster-resources/index.tsx";
import InformationCard from "./info";

export default function ComputeProjectDetail(): React.ReactElement {
    const {
        projectId,
        computeProjectId,
    }: { projectId?: string; computeProjectId?: string } = useParams();
    const {
        data: project,
        isPending,
        isError,
    } = useMyProjectQuery(projectId ?? "");
    const auth = useAuth();

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
                There was an error loading the compute project
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

    const showUserFilter =
        auth.oid !== null &&
        project.principal_investigator_id !== null &&
        auth.oid === project.principal_investigator_id;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
            <Container sx={{ py: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                            }}
                        >
                            <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    sx={{
                                        fontFamily: "monospace",
                                        fontWeight: 600,
                                    }}
                                >
                                    {computeProject.compute_project_id}
                                </Typography>
                                <Typography color="text.secondary">
                                    {project.title ?? "Untitled Project"}
                                </Typography>
                            </Stack>
                            <Chip
                                label={
                                    project.is_active ? "Active" : "Inactive"
                                }
                                size="small"
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

                    <Grid size={{ xs: 12, md: 4 }}>
                        <InformationCard
                            project={project}
                            projectId={projectId ?? ""}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 8 }}>
                        <Card variant="outlined" sx={{ height: "100%" }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ mb: 2 }}>
                                    Usage
                                </Typography>
                                <UsageChart
                                    sx={{ width: "100%" }}
                                    project={project}
                                    computeProject={computeProject}
                                    showUserFilter={showUserFilter}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={12}>
                        <Stack spacing={2}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" sx={{ mb: 2 }}>
                                        Jobs
                                    </Typography>
                                    <JobTable
                                        project={project}
                                        computeProjectId={
                                            computeProject.compute_project_id
                                        }
                                    />
                                </CardContent>
                            </Card>

                            <ClusterResources
                                project={project}
                                computeProject={computeProject}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </LocalizationProvider>
    );
}
