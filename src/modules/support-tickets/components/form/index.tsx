import React from "react";
import { Alert, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import Attachment from "./Attachment.tsx";
import Body from "./Body.tsx";
import ComputeProjectComponent from "./ComputeProject.tsx";
import JobId from "./JobId.tsx";
import Project from "./Project.tsx";
import Service from "./Service.tsx";
import ServiceGroup from "./ServiceGroup.tsx";
import Subject from "./Subject.tsx";
import SubmitButton from "./SubmitButton.tsx";
import SubmitError from "./SubmitError.tsx";
import FormSkeleton from "./FormSkeleton.tsx";
import useDefaults from "../../hooks/useDefaults.ts";
import useProjects from "../../hooks/useProjects.ts";
import useServiceGroups from "../../hooks/useServiceGroups.ts";
import useSubmit from "../../hooks/useSubmit.ts";

export default function Form(): React.ReactElement {
    const {
        projects,
        loading: projectsLoading,
        error: projectsError,
    } = useProjects();
    const {
        serviceGroups,
        loading: serviceGroupsLoading,
        error: serviceGroupsError,
    } = useServiceGroups();
    const { computeProjects, projectLoading, serviceOptions } = useDefaults({
        projects,
        serviceGroups,
    });
    const { handleAttachmentChange, handleSubmit } = useSubmit();
    const loading = projectsLoading || serviceGroupsLoading || projectLoading;
    const error = projectsError ?? serviceGroupsError;

    if (loading) {
        return <FormSkeleton />;
    }

    return (
        <Paper
            component="form"
            elevation={3}
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                void handleSubmit(event);
            }}
            sx={{ p: { xs: 2, md: 3 } }}
        >
            <Stack spacing={3}>
                <Typography variant="h5" component="h2">
                    Create New Support Ticket
                </Typography>

                {error !== null && <Alert severity="error">{error}</Alert>}
                {projects.length === 0 && !loading && (
                    <Alert severity="info">
                        No user-related projects are available. You can still
                        submit a general support ticket.
                    </Alert>
                )}

                <SubmitError />

                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Subject />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Project
                            loading={projectsLoading}
                            projects={projects}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <ComputeProjectComponent
                            computeProjects={computeProjects}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <ServiceGroup serviceGroups={serviceGroups} />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Service serviceOptions={serviceOptions} />
                    </Grid>

                    <Grid size={12}>
                        <JobId />
                    </Grid>

                    <Grid size={12}>
                        <Body />
                    </Grid>

                    <Grid size={12}>
                        <Attachment
                            handleAttachmentChange={handleAttachmentChange}
                        />
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <SubmitButton loading={loading} />
                </Box>
            </Stack>
        </Paper>
    );
}
