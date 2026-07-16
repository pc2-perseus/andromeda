import React from "react";
import { useTheme } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

import type { ComputeProjectOverviewItem } from "../../types/project.ts";

export default function RecentJobsChart({
    jobs,
}: {
    jobs: ComputeProjectOverviewItem["recent_jobs"];
}): React.ReactElement {
    const theme = useTheme();
    const jobCounts = jobs.map((job) => job.count);
    const max = Math.max(...jobCounts, 1);
    const padding = 0.1;

    return (
        <SparkLineChart
            data={jobCounts}
            xAxis={{
                data: jobs.map((_, index) => index),
            }}
            yAxis={{
                min: -padding,
                max: max + padding,
            }}
            area
            color={theme.palette.primary.main}
            height={160}
            margin={0}
            curve="bumpX"
            sx={{
                "& .MuiLineChart-area": {
                    fillOpacity: 0.12,
                },
            }}
        />
    );
}
