import React from "react";
import { LinearProgress, Stack, Typography } from "@mui/material";
import formatNumber from "../../../../utils/formatNumber.ts";

export default function UsageProgress({
    value,
    max,
    unit,
    percent,
    dangerThresholdPercent,
}: {
    value: number;
    max: number;
    unit: string;
    percent: number;
    dangerThresholdPercent: number;
}): React.ReactElement {
    return (
        <Stack spacing={0.75}>
            <Typography variant="caption" color="text.secondary">
                {formatNumber(value)} / {formatNumber(max)}
                {unit}
            </Typography>
            <LinearProgress
                variant="determinate"
                value={percent}
                color={percent >= dangerThresholdPercent ? "error" : "primary"}
                sx={{ height: 8, borderRadius: 4 }}
            />
        </Stack>
    );
}
