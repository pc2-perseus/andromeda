import React from "react";
import {
    Box,
    Card,
    CardContent,
    Divider,
    Skeleton,
    Stack,
} from "@mui/material";

export default function Loading(): React.ReactElement {
    return (
        <Card variant="outlined">
            <CardContent>
                <Skeleton
                    variant="text"
                    width={200}
                    height={34}
                    sx={{ mb: 2 }}
                />
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, minmax(0, 1fr))",
                        },
                        gap: 3,
                    }}
                >
                    {[0, 1].map((clusterIndex) => (
                        <Box key={clusterIndex}>
                            <Skeleton
                                variant="text"
                                width={160}
                                height={30}
                                sx={{ mb: 1.5 }}
                            />
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ flexWrap: "wrap" }}
                            >
                                {[0, 1].map((resourceIndex) => (
                                    <Stack
                                        key={resourceIndex}
                                        spacing={0.5}
                                        sx={{
                                            alignItems: "center",
                                            width: 140,
                                        }}
                                    >
                                        <Skeleton
                                            variant="rounded"
                                            width={132}
                                            height={74}
                                            sx={{
                                                borderTopLeftRadius: 74,
                                                borderTopRightRadius: 74,
                                            }}
                                        />
                                        <Skeleton variant="text" width={108} />
                                    </Stack>
                                ))}
                            </Stack>
                            <Divider sx={{ mt: 2 }} />
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}
