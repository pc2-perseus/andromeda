import React from "react";
import { Container, Stack } from "@mui/material";
import { ResourceProvider } from "../../contexts/resources/ResourceProvider.tsx";
import Form from "./components/form/index.tsx";
import Intro from "./components/Intro.tsx";
import Success from "./components/Success.tsx";
import Tips from "./components/Tips.tsx";
import useReset from "./hooks/useReset.ts";
import useSubmissionState from "./hooks/useSubmissionState.ts";

export default function Index(): React.ReactElement {
    const reset = useReset();
    const { value: submissionState } = useSubmissionState();

    React.useEffect(() => {
        reset();

        return () => {
            reset();
        };
    }, [reset]);

    if (submissionState !== null) {
        return (
            <Container sx={{ py: 2 }}>
                <Success
                    attachmentWarning={submissionState.attachmentWarning}
                />
            </Container>
        );
    }

    return (
        <ResourceProvider>
            <Container sx={{ py: 2 }}>
                <Stack spacing={3}>
                    <Intro />
                    <Tips />
                    <Form />
                </Stack>
            </Container>
        </ResourceProvider>
    );
}
