import React from "react";
import { Box, Tooltip } from "@mui/material";
import { SystemStatusCategory } from "../../../types/perseus/SystemStatusCategory.ts";
import type { SystemStatusEntry } from "../../../types/perseus/SystemStatusEntry.ts";
import { getTopSystemStatusEntryForDay } from "../functions/systemStatus.ts";
import useSystemStatusCategoryColor from "../hooks/useSystemStatusCategoryColor.ts";
import useSystemStatusEntryStatusLabel from "../hooks/useSystemStatusEntryStatusLabel.ts";

export default function DayStatusSegment({
    day,
    entries,
}: {
    day: Date;
    entries: SystemStatusEntry[];
}): React.ReactElement {
    const entry = getTopSystemStatusEntryForDay(entries, day);
    const category = entry?.category ?? SystemStatusCategory.RUNNING;
    const label = useSystemStatusEntryStatusLabel(entry);
    const color = useSystemStatusCategoryColor(category);

    return (
        <Tooltip
            title={`${day.toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
            })}: ${label}`}
        >
            <Box
                component="span"
                sx={{
                    minWidth: 0,
                    height: "100%",
                    borderRadius: 0.75,
                    bgcolor: color,
                }}
            />
        </Tooltip>
    );
}
