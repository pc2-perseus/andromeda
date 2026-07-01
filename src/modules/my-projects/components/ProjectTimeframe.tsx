import React from "react";
import {
    Chip,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";

function pluralizeDays(days: number): string {
    return `${days} day${days === 1 ? "" : "s"}`;
}

function formatDate(value: Date): string {
    return dayjs(value).format("DD.MM.YYYY");
}

export default function ProjectTimeframe({
    start,
    end,
}: {
    start: Date | null;
    end: Date | null;
}): React.ReactElement | null {
    if (!start && !end) {
        return null;
    }

    const startDay = start ? dayjs(start).startOf("day") : null;
    const endDay = end ? dayjs(end).startOf("day") : null;
    const today = dayjs().startOf("day");

    let rangeLabel = "";
    if (start && end) {
        rangeLabel = `${formatDate(start)} - ${formatDate(end)}`;
    } else if (start) {
        rangeLabel = `From: ${formatDate(start)}`;
    } else if (end) {
        rangeLabel = `To: ${formatDate(end)}`;
    }

    let relativeLabel = "";
    let projectPhase: "past" | "during" | "future" = "future";
    if (startDay && today.isBefore(startDay)) {
        relativeLabel = `${pluralizeDays(startDay.diff(today, "day"))} until start`;
        projectPhase = "future";
    } else if (endDay && today.isAfter(endDay)) {
        relativeLabel = `${pluralizeDays(today.diff(endDay, "day"))} since end`;
        projectPhase = "past";
    } else if (endDay) {
        relativeLabel = `${pluralizeDays(endDay.diff(today, "day"))} left`;
        projectPhase = "during";
    } else if (startDay) {
        relativeLabel = `${pluralizeDays(today.diff(startDay, "day"))} since start`;
        projectPhase = "during";
    }

    return (
        <>
            <Divider />
            <ListItem>
                <ListItemIcon>
                    <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Timeframe"
                    secondaryTypographyProps={{ component: "div" }}
                    secondary={
                        <Stack spacing={0.75} sx={{ mt: 0.25 }}>
                            {rangeLabel}
                            {relativeLabel.length > 0 ? (
                                <Chip
                                    label={relativeLabel}
                                    size="small"
                                    variant={
                                        projectPhase === "during"
                                            ? "filled"
                                            : "outlined"
                                    }
                                    sx={
                                        projectPhase === "during"
                                            ? {
                                                  backgroundColor:
                                                      "warning.main",
                                                  color: "warning.contrastText",
                                                  width: "fit-content",
                                              }
                                            : {
                                                  width: "fit-content",
                                              }
                                    }
                                />
                            ) : null}
                        </Stack>
                    }
                />
            </ListItem>
        </>
    );
}
