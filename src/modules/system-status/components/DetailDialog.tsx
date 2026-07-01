import React from "react";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import parseMarkdown from "../../../utils/parseMarkdown.ts";
import { formatSystemStatusTimeRange } from "../functions/systemStatus.ts";
import type { SystemStatusServiceItem } from "../types/SystemStatusGroup.ts";
import StatusChip from "./StatusChip.tsx";

export default function DetailDialog({
    open,
    groupTitle,
    serviceItem,
    onClose,
}: {
    open: boolean;
    groupTitle: string;
    serviceItem: SystemStatusServiceItem | null;
    onClose: () => void;
}): React.ReactElement {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                {groupTitle} - {serviceItem?.service.name ?? ""}
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={3}>
                    {(serviceItem?.entries ?? []).map((entry, index) => (
                        <React.Fragment
                            key={entry._id ?? `${entry.title}-${index}`}
                        >
                            {index > 0 && <Divider />}
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
                                    <Box>
                                        <Typography variant="h6" component="h2">
                                            {entry.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 0.5 }}
                                        >
                                            {formatSystemStatusTimeRange(entry)}
                                        </Typography>
                                    </Box>
                                    <StatusChip
                                        category={entry.category}
                                        label={entry.status_type}
                                    />
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
                                        mt: 2,
                                        "& p": {
                                            mt: 0,
                                            mb: 1.5,
                                        },
                                        "& ul, & ol": {
                                            mt: 0,
                                            mb: 1.5,
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
                        </React.Fragment>
                    ))}
                    {(serviceItem?.entries.length ?? 0) === 0 && (
                        <Typography color="text.secondary">
                            All services up and running.
                        </Typography>
                    )}
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
