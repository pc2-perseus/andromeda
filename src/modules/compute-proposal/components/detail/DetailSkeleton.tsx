import React from "react";

// MUI imports
import { Box, Skeleton, Stack } from "@mui/material";

function TableSkeleton({ rows }: { rows: number }): React.ReactElement {
    return (
        <Stack spacing={0.75}>
            {Array.from({ length: rows }).map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "180px minmax(0, 1fr)",
                        columnGap: 2,
                    }}
                >
                    <Skeleton variant="text" width="70%" />
                    <Skeleton
                        variant="text"
                        width={index % 3 === 0 ? "90%" : "55%"}
                    />
                </Box>
            ))}
        </Stack>
    );
}

export default function DetailSkeleton(): React.ReactElement {
    return (
        <Stack spacing={3}>
            <Skeleton variant="text" width={220} height={72} />
            <TableSkeleton rows={9} />

            <Skeleton variant="text" width={360} height={72} sx={{ mt: 3 }} />
            <Stack spacing={1}>
                <Skeleton variant="rounded" height={96} />
                <TableSkeleton rows={4} />
            </Stack>

            <Skeleton variant="text" width={340} height={72} sx={{ mt: 3 }} />
            <Stack spacing={2}>
                <Box>
                    <Skeleton variant="text" width={160} height={40} />
                    <TableSkeleton rows={3} />
                </Box>
                <Box>
                    <Skeleton variant="text" width={180} height={40} />
                    <TableSkeleton rows={3} />
                </Box>
            </Stack>

            <Skeleton variant="text" width={300} height={72} sx={{ mt: 3 }} />
            <TableSkeleton rows={4} />
        </Stack>
    );
}
