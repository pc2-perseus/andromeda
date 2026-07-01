// React imports
import React from "react";

// MUI imports
import { Alert, Container, Grid, Tab } from "@mui/material";

// Custom imports
import useMyProject from "../../hooks/useMyProject.ts";
import { useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ResourceProvider } from "../../../../contexts/resources/ResourceProvider.tsx";
import useAuthentication from "../../../../contexts/authentication";
import useComputeProjectSelection from "../../hooks/useComputeProjectSelection.ts";
import TabContext from "@mui/lab/TabContext";
import { TabList } from "@mui/lab";
import Header from "./Header.tsx";
import InformationTab from "./tabs/InformationTab.tsx";
import SelfServicesTab from "./tabs/SelfServicesTab.tsx";
import ComputeProjectTab from "./tabs/ComputeProjectTab.tsx";
import DetailSkeleton from "./DetailSkeleton.tsx";

const INFORMATION_TAB = "information-description";
const SELF_SERVICES_TAB = "self-services";

export default function Detail(): React.ReactElement {
    const { projectId }: { projectId?: string } = useParams();
    const { project, loading, error } = useMyProject(projectId ?? "");
    const { authData } = useAuthentication();

    const { hasComputeProjects, setSelectedComputeProjectId } =
        useComputeProjectSelection(project?.compute_projects || []);
    const [selectedTabValue, setSelectedTabValue] = React.useState<string>("");

    React.useEffect(() => {
        if (!project) {
            return;
        }

        if (project.compute_projects.length === 0) {
            if (
                selectedTabValue !== INFORMATION_TAB &&
                selectedTabValue !== SELF_SERVICES_TAB
            ) {
                setSelectedTabValue(INFORMATION_TAB);
            }
            return;
        }

        const computeProjectStillExists = project.compute_projects.some(
            (computeProject) =>
                computeProject.compute_project_id === selectedTabValue
        );
        if (computeProjectStillExists) {
            return;
        }

        if (
            selectedTabValue === INFORMATION_TAB ||
            selectedTabValue === SELF_SERVICES_TAB
        ) {
            return;
        }

        const firstComputeProjectId =
            project.compute_projects[0].compute_project_id;
        setSelectedTabValue(firstComputeProjectId);
        setSelectedComputeProjectId(firstComputeProjectId);
    }, [project, selectedTabValue, setSelectedComputeProjectId]);

    if (loading) {
        return (
            <Container sx={{ py: 2 }}>
                <DetailSkeleton />
            </Container>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!project) {
        return <Alert severity="error">Project not found</Alert>;
    }

    const defaultTabValue =
        project.compute_projects.length > 0
            ? project.compute_projects[0].compute_project_id
            : INFORMATION_TAB;
    const currentTabValue =
        selectedTabValue === "" ? defaultTabValue : selectedTabValue;
    const showUserFilter =
        authData.oid !== null &&
        project.principal_investigator_id !== null &&
        authData.oid === project.principal_investigator_id;

    return (
        <ResourceProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                <Container sx={{ py: 2 }}>
                    <TabContext value={currentTabValue}>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Header project={project} />
                            </Grid>

                            <Grid size={12}>
                                <TabList
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    allowScrollButtonsMobile
                                    onChange={(_, newValue: string) => {
                                        setSelectedTabValue(newValue);
                                        if (
                                            newValue === INFORMATION_TAB ||
                                            newValue === SELF_SERVICES_TAB
                                        ) {
                                            return;
                                        }

                                        if (hasComputeProjects) {
                                            setSelectedComputeProjectId(
                                                newValue
                                            );
                                        }
                                    }}
                                    aria-label="Project detail tab navigation"
                                >
                                    {project.compute_projects.map(
                                        (computeProject) => (
                                            <Tab
                                                key={
                                                    computeProject.compute_project_id
                                                }
                                                label={
                                                    computeProject.compute_project_id
                                                }
                                                value={
                                                    computeProject.compute_project_id
                                                }
                                            />
                                        )
                                    )}
                                    <Tab
                                        label="Information & Description"
                                        value={INFORMATION_TAB}
                                    />
                                    <Tab
                                        label="Self services"
                                        value={SELF_SERVICES_TAB}
                                    />
                                </TabList>
                            </Grid>

                            <Grid size={12}>
                                <InformationTab
                                    project={project}
                                    value={INFORMATION_TAB}
                                />
                                <SelfServicesTab value={SELF_SERVICES_TAB} />
                                {project.compute_projects.map(
                                    (computeProject) => (
                                        <ComputeProjectTab
                                            key={
                                                computeProject.compute_project_id
                                            }
                                            project={project}
                                            computeProject={computeProject}
                                            showUserFilter={showUserFilter}
                                        />
                                    )
                                )}
                            </Grid>
                        </Grid>
                    </TabContext>
                </Container>
            </LocalizationProvider>
        </ResourceProvider>
    );
}
