import React from "react";

import { Box, Divider, Skeleton, Stack } from "@mui/material";

export default function ProfileSkeleton(): React.ReactElement {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    py: 5,
                    width: "95vw",
                    maxWidth: "1400px",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 4,
                }}
            >
                <Stack
                    spacing={2}
                    sx={{
                        width: { xs: "100%", md: 250 },
                        flexShrink: 0,
                    }}
                >
                    <Skeleton
                        variant="text"
                        width={120}
                        height={36}
                        sx={{ alignSelf: "center" }}
                    />
                    <Skeleton variant="rounded" height={36} />
                    <Skeleton variant="rounded" height={36} />
                    <Divider sx={{ my: 1 }} />
                    <Skeleton variant="rounded" height={36} />
                    <Skeleton variant="rounded" height={36} />
                </Stack>

                <Stack spacing={3} sx={{ flex: 1, minWidth: 0 }}>
                    <Stack spacing={2}>
                        <Skeleton variant="text" width={120} height={48} />
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    md: "2fr 5fr 5fr",
                                },
                                gap: 2,
                            }}
                        >
                            <Skeleton variant="rounded" height={56} />
                            <Skeleton variant="rounded" height={56} />
                            <Skeleton variant="rounded" height={56} />
                        </Box>
                    </Stack>

                    <Divider />

                    <Stack spacing={2}>
                        <Skeleton variant="text" width={180} height={48} />
                        <Skeleton variant="text" width="70%" height={28} />
                        <Skeleton variant="rounded" height={56} />
                        <Skeleton
                            variant="rounded"
                            width={140}
                            height={36}
                            sx={{ alignSelf: "flex-end" }}
                        />
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}
