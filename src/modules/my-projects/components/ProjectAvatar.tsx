// React imports
import React from "react";

// MUI imports
import { Avatar } from "@mui/material";
import MemoryIcon from "@mui/icons-material/Memory";
import BugReportIcon from "@mui/icons-material/BugReport";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";

function stringAvatar(name: string): string {
    const parts = name.split("-").filter(Boolean);

    if (parts.length === 0) return "";

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export default function ProjectAvatar({
    type,
}: {
    type: string;
}): React.ReactElement {
    let icon: React.ReactElement | string | null = null;

    switch (type) {
        case "test":
            icon = <BugReportIcon />;
            break;
        case "small":
            icon = <ShowChartIcon />;
            break;
        case "normal":
            icon = <SsidChartIcon />;
            break;
        case "large":
            icon = <StackedLineChartIcon />;
            break;
        case "fpga-development":
            icon = <MemoryIcon />;
            break;
        default:
            icon = stringAvatar(type);
            break;
    }

    return <Avatar sx={{ bgcolor: "primary.main" }}>{icon}</Avatar>;
}
