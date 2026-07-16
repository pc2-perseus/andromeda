// React imports
import React from "react";

// MUI imports
import { Box, Container, Stack, Typography } from "@mui/material";

// Custom imports
import List from "./components/compute-project-list";

export default function MyProjects(): React.ReactElement {
    return (
        <Container>
            <Stack sx={{ py: 2 }} spacing={3}>
                <Box sx={{ flexGrow: 1, pb: 2 }}>
                    <Box sx={{ px: 2, mt: 2, mb: 3 }}>
                        <Typography variant="h2" component="h1">
                            My projects
                        </Typography>
                        <Typography color="text.secondary">
                            View your compute projects, current activity, and
                            available project resources.
                        </Typography>
                    </Box>
                    <Box sx={{ px: 2 }}>
                        <List />
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
}
