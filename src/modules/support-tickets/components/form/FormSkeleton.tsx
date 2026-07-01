import React from "react";
import { Box, Grid, Paper, Skeleton, Stack } from "@mui/material";

export default function FormSkeleton(): React.ReactElement {
    return (
        <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={3}>
                <Skeleton variant="text" width={260} height={36} />

                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Skeleton variant="rounded" height={56} />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Skeleton variant="rounded" height={56} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Skeleton variant="rounded" height={56} />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Skeleton variant="rounded" height={56} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Skeleton variant="rounded" height={56} />
                    </Grid>

                    <Grid size={12}>
                        <Skeleton variant="rounded" height={56} />
                    </Grid>

                    <Grid size={12}>
                        <Skeleton variant="rounded" height={188} />
                    </Grid>

                    <Grid size={12}>
                        <Skeleton variant="rounded" height={40} />
                    </Grid>
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Skeleton variant="rounded" width={120} height={36} />
                </Box>
            </Stack>
        </Paper>
    );
}
