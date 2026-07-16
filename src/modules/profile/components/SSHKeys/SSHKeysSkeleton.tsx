import React from "react";

import { Box, Grid, Skeleton } from "@mui/material";

export default function SSHKeysSkeleton(): React.ReactElement {
    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Skeleton variant="text" width={220} height={48} />
                <Skeleton variant="rounded" width={160} height={30} />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Grid container spacing={2} sx={{ px: 2 }}>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Skeleton variant="text" width="60%" height={28} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Skeleton variant="text" width="40%" height={28} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Skeleton variant="text" width="60%" height={28} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Skeleton variant="text" width="60%" height={28} />
                    </Grid>
                </Grid>

                {Array.from({ length: 3 }).map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                            p: 2,
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid size={{ xs: 12, md: 2 }}>
                                <Skeleton variant="text" width="75%" />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Skeleton variant="text" width="95%" />
                            </Grid>
                            <Grid size={{ xs: 12, md: 2 }}>
                                <Skeleton variant="text" width="80%" />
                            </Grid>
                            <Grid size={{ xs: 12, md: 2 }}>
                                <Skeleton
                                    variant="circular"
                                    width={32}
                                    height={32}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                ))}
            </Box>
        </React.Fragment>
    );
}
