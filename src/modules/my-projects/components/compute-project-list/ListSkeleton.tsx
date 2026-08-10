import React from "react";
import {
    Box,
    Card,
    ListItem as MuiListItem,
    ListItemButton,
    Skeleton,
    Stack,
} from "@mui/material";

export default function ListSkeleton(): React.ReactElement {
    return (
        <Stack spacing={1.5}>
            {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} variant="outlined">
                    <MuiListItem disablePadding>
                        <ListItemButton
                            sx={{
                                alignItems: "stretch",
                                display: "flex",
                                minHeight: { xs: "auto", md: 260 },
                                px: { xs: 1.5, sm: 2, md: 2.5 },
                                pt: { xs: 1.5, sm: 2, md: 2.5 },
                                pb: { xs: 0.75, sm: 1, md: 1.25 },
                            }}
                        >
                            <Stack
                                spacing={1.5}
                                sx={{ width: "100%", minWidth: 0 }}
                            >
                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    spacing={{ xs: 1, sm: 2 }}
                                >
                                    <Stack
                                        spacing={0.75}
                                        sx={{ flex: 1, minWidth: 0 }}
                                    >
                                        <Skeleton
                                            variant="text"
                                            width="35%"
                                            height={32}
                                        />
                                        <Skeleton
                                            variant="text"
                                            width="70%"
                                            height={24}
                                        />
                                    </Stack>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 0.75,
                                            overflowX: "auto",
                                            whiteSpace: "nowrap",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Skeleton
                                            variant="rounded"
                                            width={96}
                                            height={24}
                                            sx={{ flex: "0 0 auto" }}
                                        />
                                        <Skeleton
                                            variant="rounded"
                                            width={132}
                                            height={24}
                                            sx={{ flex: "0 0 auto" }}
                                        />
                                    </Box>
                                </Stack>

                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    spacing={{ xs: 1.5, sm: 4, md: 10 }}
                                    sx={{ alignItems: "stretch" }}
                                >
                                    <Skeleton
                                        variant="rounded"
                                        height={160}
                                        sx={{ flex: 1, minWidth: 0 }}
                                    />

                                    <Stack
                                        spacing={0.75}
                                        sx={{
                                            justifyContent: "flex-end",
                                            alignItems: {
                                                xs: "flex-start",
                                                sm: "flex-end",
                                            },
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Skeleton
                                            variant="text"
                                            width={88}
                                            height={64}
                                        />
                                        <Skeleton
                                            variant="text"
                                            width={150}
                                            height={20}
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                        </ListItemButton>
                    </MuiListItem>
                </Card>
            ))}
        </Stack>
    );
}
