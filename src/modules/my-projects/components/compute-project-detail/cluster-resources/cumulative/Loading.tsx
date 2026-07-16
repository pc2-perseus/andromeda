import React from "react";
import {
    Card,
    CardContent,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

export default function Loading(): React.ReactElement {
    return (
        <Card variant="outlined">
            <CardContent>
                <Skeleton
                    variant="text"
                    width={220}
                    height={34}
                    sx={{ mb: 2 }}
                />
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {[0, 1, 2, 3].map((index) => (
                                    <TableCell key={index}>
                                        <Skeleton variant="text" width="70%" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[0, 1, 2].map((rowIndex) => (
                                <TableRow key={rowIndex}>
                                    <TableCell>
                                        <Skeleton variant="text" width={110} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={150} />
                                    </TableCell>
                                    <TableCell>
                                        <Stack spacing={0.75}>
                                            <Skeleton
                                                variant="text"
                                                width={120}
                                            />
                                            <Skeleton
                                                variant="rounded"
                                                height={8}
                                                sx={{ borderRadius: 4 }}
                                            />
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Skeleton
                                            variant="rounded"
                                            width={82}
                                            height={24}
                                            sx={{ ml: "auto" }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}
