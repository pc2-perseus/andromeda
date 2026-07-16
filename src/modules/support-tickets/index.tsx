import React from "react";
import { Container, Stack } from "@mui/material";
import Form from "./components/form/index.tsx";
import Intro from "./components/Intro.tsx";
import Tips from "./components/Tips.tsx";

export default function Index(): React.ReactElement {
    return (
        <Container sx={{ py: 2 }}>
            <Stack spacing={3}>
                <Intro />
                <Tips />
                <Form />
            </Stack>
        </Container>
    );
}
