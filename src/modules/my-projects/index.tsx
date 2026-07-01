// React imports
import React from "react";

// MUI imports
import { Container, Stack, Typography } from "@mui/material";

// Custom imports
import List from "./components/list";

export default function MyProjects(): React.ReactElement {
    return (
        <Container>
            <Stack sx={{ p: 2 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    My projects
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                    Here you can find a list of your currently active projects.
                    Click on a project to view it's details.
                </Typography>

                <List />
            </Stack>
        </Container>
    );
}
