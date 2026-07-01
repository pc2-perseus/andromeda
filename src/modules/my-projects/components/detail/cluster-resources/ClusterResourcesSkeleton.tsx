import React from "react";
import { Box, Divider, Skeleton, Stack } from "@mui/material";

export default function ClusterResourcesSkeleton(): React.ReactElement {
    return (
        <Stack spacing={3}>
            {[0, 1].map((clusterIndex) => (
                <Box key={clusterIndex}>
                    {clusterIndex > 0 ? <Divider sx={{ mb: 2 }} /> : null}
                    <Skeleton
                        variant="text"
                        width={180}
                        height={34}
                        sx={{ mb: 1.5 }}
                    />
                    <Stack spacing={1.5}>
                        {[0, 1, 2].map((resourceIndex) => (
                            <Box key={resourceIndex}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 2,
                                        mb: 0.5,
                                    }}
                                >
                                    <Skeleton variant="text" width={180} />
                                    <Skeleton variant="text" width={120} />
                                </Box>
                                <Skeleton
                                    variant="rounded"
                                    height={8}
                                    sx={{ borderRadius: 4 }}
                                />
                            </Box>
                        ))}
                    </Stack>
                </Box>
            ))}
        </Stack>
    );
}
