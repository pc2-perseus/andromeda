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
import useSubmit from "../../hooks/useSubmit.ts";
import Success from "../Success.tsx";
import useReset from "../../hooks/useReset.ts";

export default function Form(): React.ReactElement {
    const reset = useReset();
    const { isSuccess, isError, error, handleAttachmentChange, handleSubmit } =
        useSubmit();

    React.useEffect(() => {
        reset();

        return () => {
            reset();
        };
    }, [reset]);

    if (isSuccess) {
        return <Success />;
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

                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Subject />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Project />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <ComputeProjectComponent />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <ServiceGroup />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Service />
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

                {isError ? (
                    <Alert severity="error">{error?.message}</Alert>
                ) : null}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <SubmitButton />
                </Box>
            </Stack>
        </Paper>
    );
}
