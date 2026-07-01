import React from "react";
import { Card, CardContent, CardHeader, Skeleton, Stack } from "@mui/material";

export default function PersonSkeleton({
    title,
}: {
    title?: string | null;
}): React.ReactElement {
    return (
        <Card sx={{ height: "100%" }}>
            <CardHeader title={title ?? "Not available"} />
            <CardContent sx={{ pt: 0 }}>
                <Stack spacing={1.25}>
                    <Skeleton variant="text" width="65%" height={28} />
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Skeleton variant="circular" width={20} height={20} />
                        <Skeleton variant="text" width="75%" height={24} />
                    </Stack>
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Skeleton variant="circular" width={20} height={20} />
                        <Skeleton variant="text" width="60%" height={24} />
                    </Stack>
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Skeleton variant="circular" width={20} height={20} />
                        <Skeleton variant="text" width="70%" height={24} />
                    </Stack>
                    <Skeleton variant="text" width="45%" height={20} />
                </Stack>
            </CardContent>
        </Card>
    );
}
