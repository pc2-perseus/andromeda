import React from "react";
import { Container, Stack } from "@mui/material";
import SystemStatusContent from "./components/Content.tsx";

export default function SystemStatus(): React.ReactElement {
    return (
        <Container sx={{ py: 2 }}>
            <Stack spacing={2}>
                <SystemStatusContent />
            </Stack>
        </Container>
    );
}
