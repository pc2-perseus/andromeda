import React from "react";
import {
    Card,
    CardContent,
    Grid,
    Skeleton as MUISkeleton,
    Stack,
} from "@mui/material";

export default function Skeleton(): React.ReactElement {
    return (
        <Grid container spacing={2}>
            {[0, 1, 2].map((item: number) => (
                <Grid key={item} size={{ xs: 12, md: 6, xl: 4 }}>
                    <Card>
                        <CardContent>
                            <MUISkeleton
                                variant="text"
                                width="45%"
                                height={48}
                            />
                            <Stack spacing={2}>
                                {[0, 1, 2, 3].map((row: number) => (
                                    <Stack key={row} spacing={0.75}>
                                        <MUISkeleton
                                            variant="text"
                                            width={`${50 + row * 10}%`}
                                            height={28}
                                        />
                                        <MUISkeleton
                                            variant="text"
                                            width={`${35 + row * 8}%`}
                                        />
                                    </Stack>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
