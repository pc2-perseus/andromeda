import React from "react";

// MUI imports
import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

export default function ListSkeleton(): React.ReactElement {
    return (
        <Stack spacing={0}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Card
                    key={index}
                    variant="outlined"
                    sx={{
                        borderTopRightRadius: index === 0 ? undefined : "0px",
                        borderBottomRightRadius:
                            index === 4 ? undefined : "0px",
                        borderBottom: index === 4 ? undefined : "none",
                    }}
                >
                    <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                        <Box sx={{ display: "flex" }}>
                            <Box
                                sx={{
                                    px: 1,
                                    py: 1,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Skeleton
                                    variant="rounded"
                                    width={24}
                                    height={72}
                                />
                            </Box>

                            <Box sx={{ py: 1, ml: 1, flexGrow: 2 }}>
                                <Skeleton variant="text" width="30%" />
                                <Skeleton
                                    variant="text"
                                    width="55%"
                                    height={32}
                                />
                            </Box>

                            <Box
                                sx={{
                                    pt: "8px",
                                    pr: "6px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Skeleton
                                    variant="rounded"
                                    width={120}
                                    height={24}
                                />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    );
}
