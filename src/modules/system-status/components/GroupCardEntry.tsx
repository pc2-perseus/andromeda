import React from "react";
import {
    Box,
    Button,
    Collapse,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningIcon from "@mui/icons-material/Warning";
import ConstructionIcon from "@mui/icons-material/Construction";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SystemStatusCategory } from "../../../types/perseus/SystemStatusCategory.ts";
import type { SystemStatusServiceItem } from "../types/SystemStatusGroup.ts";
import useLastSystemStatusDays from "../hooks/useLastSystemStatusDays.ts";
import useSystemStatusCategoryColor from "../hooks/useSystemStatusCategoryColor.ts";
import useSystemStatusEntryStatusLabel from "../hooks/useSystemStatusEntryStatusLabel.ts";
import DayStatusSegment from "./DayStatusSegment.tsx";
import GroupCardEntryDetails from "./GroupCardEntryDetails.tsx";

const CATEGORY_ICON: Record<
    SystemStatusCategory,
    React.ComponentType<SvgIconProps>
> = {
    [SystemStatusCategory.RUNNING]: CheckCircleIcon,
    [SystemStatusCategory.INFO]: InfoOutlinedIcon,
    [SystemStatusCategory.WARNING]: WarningIcon,
    [SystemStatusCategory.ERROR]: ErrorIcon,
    [SystemStatusCategory.MAINTENANCE]: ConstructionIcon,
};

export default function GroupCardEntry({
    serviceItem,
}: {
    serviceItem: SystemStatusServiceItem;
}): React.ReactElement {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const topEntry = serviceItem.topEntry;
    const statusCategory = topEntry?.category ?? SystemStatusCategory.RUNNING;
    const statusLabel = useSystemStatusEntryStatusLabel(topEntry);
    const statusColor = useSystemStatusCategoryColor(statusCategory);
    const StatusIcon = CATEGORY_ICON[statusCategory];
    const days = useLastSystemStatusDays(14);
    const hasEntries = serviceItem.entries.length > 0;

    return (
        <Box
            sx={{
                width: "100%",
                textAlign: "left",
                borderRadius: 1,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    py: 0.75,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            minWidth: 0,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                fontSize: "1rem",
                                color: statusColor,
                                flexShrink: 0,
                            }}
                        >
                            <StatusIcon fontSize="inherit" />
                        </Box>
                        <Typography
                            variant="subtitle1"
                            sx={{ minWidth: 0, fontWeight: 600 }}
                            noWrap
                        >
                            {serviceItem.service.name}
                        </Typography>
                    </Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            flexShrink: 0,
                            textTransform: "lowercase",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {statusLabel}
                    </Typography>
                </Box>

                {topEntry !== null && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.25 }}
                        noWrap
                    >
                        {topEntry.title}
                    </Typography>
                )}

                <Box
                    sx={{
                        mt: 0.75,
                        display: "grid",
                        gridTemplateColumns: "repeat(14, minmax(0, 1fr))",
                        gap: 0.35,
                        height: 18,
                    }}
                >
                    {days.map((day: Date): React.ReactElement => {
                        return (
                            <DayStatusSegment
                                key={day.toISOString()}
                                day={day}
                                entries={serviceItem.entries}
                            />
                        );
                    })}
                </Box>

                {hasEntries && (
                    <Button
                        size="small"
                        onClick={() =>
                            setIsExpanded((current: boolean) => !current)
                        }
                        endIcon={
                            isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
                        }
                        sx={{ mt: 0.75, px: 0 }}
                    >
                        {isExpanded
                            ? "Hide status messages"
                            : "Show status messages"}
                    </Button>
                )}

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Stack spacing={2} sx={{ mt: 1.5 }}>
                        {serviceItem.entries.map((entry, index) => (
                            <React.Fragment
                                key={entry._id ?? `${entry.title}-${index}`}
                            >
                                {index > 0 && <Divider />}
                                <GroupCardEntryDetails entry={entry} />
                            </React.Fragment>
                        ))}
                    </Stack>
                </Collapse>
            </Box>
        </Box>
    );
}
