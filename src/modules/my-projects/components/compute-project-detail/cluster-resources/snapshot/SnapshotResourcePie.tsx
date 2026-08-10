import React from "react";
import { alpha, Box, Stack, Typography, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import formatNumber from "../../../../utils/formatNumber.ts";
import useClusterResources from "../useClusterResources.ts";

export default function SnapshotResourcePie({
    name,
    value,
    max,
    unit,
}: {
    name: string;
    value: number;
    max: number;
    unit: string;
}): React.ReactElement {
    const theme = useTheme();
    const { dangerThresholdPercent } = useClusterResources();
    const used = Math.max(value, 0);
    const cappedUsed = max > 0 ? Math.min(used, max) : used;
    const available = Math.max(max - cappedUsed, 0);
    const percent = max > 0 ? (used / max) * 100 : 0;
    const isDanger = percent >= dangerThresholdPercent;
    const activeColor = alpha(
        isDanger ? theme.palette.error.main : theme.palette.primary.main,
        0.75
    );
    const chartData =
        max > 0
            ? [
                  {
                      id: "used",
                      label: "Used",
                      value: cappedUsed,
                      color: activeColor,
                  },
                  {
                      id: "available",
                      label: "Available",
                      value: available,
                      color: theme.palette.action.disabledBackground,
                  },
              ]
            : [
                  {
                      id: "used",
                      label: "Used",
                      value: used,
                      color: activeColor,
                  },
              ];

    return (
        <Stack spacing={0.5} sx={{ alignItems: "center" }}>
            <Box sx={{ position: "relative", width: 180, height: 104 }}>
                <PieChart
                    series={[
                        {
                            data: chartData,
                            innerRadius: 54,
                            outerRadius: 72,
                            paddingAngle: 1,
                            startAngle: -90,
                            endAngle: 90,
                            cx: "50%",
                            cy: "82%",
                            valueFormatter: (item) =>
                                `${formatNumber(
                                    item.id === "used" ? used : available
                                )}${unit}`,
                        },
                    ]}
                    width={180}
                    height={104}
                    hideLegend
                    margin={{ top: 4, right: 4, bottom: 0, left: 4 }}
                />
                <Stack
                    spacing={0}
                    sx={{
                        alignItems: "center",
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 16,
                    }}
                >
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ lineHeight: 1 }}
                    >
                        {formatNumber(value)}
                        {unit}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ lineHeight: 1 }}
                    >
                        / {formatNumber(max)}
                        {unit}
                    </Typography>
                </Stack>
            </Box>
            <Stack spacing={0.25} sx={{ alignItems: "center" }}>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                    {name}
                </Typography>
            </Stack>
        </Stack>
    );
}
