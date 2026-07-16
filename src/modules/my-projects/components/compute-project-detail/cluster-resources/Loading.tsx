import React from "react";
import { Stack } from "@mui/material";
import CumulativeLoading from "./cumulative/Loading.tsx";
import SnapshotLoading from "./snapshot/Loading.tsx";

export default function Loading(): React.ReactElement {
    return (
        <Stack spacing={2}>
            <CumulativeLoading />
            <SnapshotLoading />
        </Stack>
    );
}
