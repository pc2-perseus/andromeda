import React from "react";
import { Box, Typography } from "@mui/material";
import type { SystemStatusEntry } from "../../../types/perseus/SystemStatusEntry.ts";
import parseMarkdown from "../../../utils/parseMarkdown.ts";
import { formatSystemStatusTimeRange } from "../functions/systemStatus.ts";
import EntryStatusChip from "./EntryStatusChip.tsx";

export default function GroupCardEntryDetails({
    entry,
}: {
    entry: SystemStatusEntry;
}): React.ReactElement {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 2,
                    flexWrap: "wrap",
                }}
            >
                <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle2" component="h3">
                        {entry.title}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            mt: 0.25,
                            display: "block",
                        }}
                    >
                        {formatSystemStatusTimeRange(entry)}
                    </Typography>
                </Box>
                <EntryStatusChip entry={entry} />
            </Box>
            {entry.global_alert && (
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mt: 1 }}
                >
                    Global alert
                </Typography>
            )}
            <Box
                sx={{
                    mt: 1,
                    color: "text.secondary",
                    "& p": {
                        mt: 0,
                        mb: 1,
                    },
                    "& ul, & ol": {
                        mt: 0,
                        mb: 1,
                        pl: 3,
                    },
                    "& li + li": {
                        mt: 0.5,
                    },
                    "& table": {
                        width: "100%",
                        borderCollapse: "collapse",
                    },
                    "& td, & th": {
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        py: 0.75,
                        pr: 1,
                        textAlign: "left",
                    },
                }}
            >
                {parseMarkdown(entry.description)}
            </Box>
        </Box>
    );
}
