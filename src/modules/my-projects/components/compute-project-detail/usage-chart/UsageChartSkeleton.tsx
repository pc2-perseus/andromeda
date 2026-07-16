import React from "react";
import { Skeleton, Stack, type StackProps } from "@mui/material";

export default function UsageChartSkeleton({
    ...props
}: StackProps): React.ReactElement {
    return (
        <Stack spacing={2} {...props}>
            <Skeleton variant="rounded" height={440} />
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Skeleton variant="text" width={72} height={28} />
                <Stack direction="row" spacing={1}>
                    <Skeleton variant="rounded" width={96} height={32} />
                    <Skeleton variant="rounded" width={96} height={32} />
                </Stack>
            </Stack>
        </Stack>
    );
}
