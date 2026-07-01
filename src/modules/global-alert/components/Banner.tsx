import React from "react";
import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import parseMarkdown from "../../../utils/parseMarkdown.ts";
import type { SystemStatusEntry } from "../../../types/perseus/SystemStatusEntry.ts";
import type { SystemStatusService } from "../../../types/perseus/SystemStatusService.ts";
import {
    formatSystemStatusTimeRange,
    getSystemStatusCategoryColor,
    getSystemStatusEntryFingerprint,
} from "../../system-status/functions/systemStatus.ts";

const COLLAPSED_DESCRIPTION_HEIGHT = 160;

export default function Banner({
    alert,
    affectedServices,
    onClose,
}: {
    alert: SystemStatusEntry;
    affectedServices: SystemStatusService[];
    onClose: () => void;
}): React.ReactElement {
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const [hasOverflow, setHasOverflow] = React.useState<boolean>(false);
    const descriptionRef = React.useRef<HTMLDivElement | null>(null);
    const alertFingerprint = getSystemStatusEntryFingerprint(alert);

    React.useEffect(() => {
        setExpanded(false);
    }, [alertFingerprint]);

    React.useEffect(() => {
        const descriptionElement = descriptionRef.current;
        if (descriptionElement === null) {
            return;
        }

        const measureOverflow = () => {
            setHasOverflow(
                descriptionElement.scrollHeight >
                    COLLAPSED_DESCRIPTION_HEIGHT + 1
            );
        };

        measureOverflow();

        const resizeObserver = new ResizeObserver(measureOverflow);
        resizeObserver.observe(descriptionElement);

        return () => resizeObserver.disconnect();
    }, [alertFingerprint]);

    return (
        <Alert
            severity={
                getSystemStatusCategoryColor(alert.category) as
                    | "success"
                    | "info"
                    | "warning"
                    | "error"
            }
            variant="outlined"
            onClose={onClose}
            sx={{
                alignItems: "flex-start",
                ".MuiAlert-message": {
                    width: "100%",
                },
            }}
        >
            <AlertTitle sx={{ mb: 0.75 }}>{alert.title}</AlertTitle>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {formatSystemStatusTimeRange(alert)}
            </Typography>
            <Box sx={{ position: "relative" }}>
                <Box
                    sx={{
                        maxHeight: expanded
                            ? "none"
                            : `${COLLAPSED_DESCRIPTION_HEIGHT}px`,
                        overflow: "hidden",
                    }}
                >
                    <Box
                        ref={descriptionRef}
                        sx={{
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
                        {parseMarkdown(alert.description)}
                    </Box>
                </Box>
                {!expanded && hasOverflow && (
                    <Box
                        sx={{
                            position: "absolute",
                            inset: "auto 0 0 0",
                            height: 48,
                            background: (theme) =>
                                `linear-gradient(to bottom, rgba(255,255,255,0), ${theme.palette.background.paper})`,
                            pointerEvents: "none",
                        }}
                    />
                )}
            </Box>
            {hasOverflow && (
                <Button
                    size="small"
                    onClick={() => setExpanded((current) => !current)}
                    sx={{ mt: 0.5, ml: -1 }}
                >
                    {expanded ? "Show less" : "Read more"}
                </Button>
            )}
            {affectedServices.length > 0 && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.75, fontStyle: "italic" }}
                >
                    Affected services:{" "}
                    {affectedServices
                        .map(
                            (service: SystemStatusService): string =>
                                service.name
                        )
                        .join(", ")}
                </Typography>
            )}
        </Alert>
    );
}
