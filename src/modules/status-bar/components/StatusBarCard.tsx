// React imports
import React from "react";

// MUI imports
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

// Icon imports
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ConstructionIcon from "@mui/icons-material/Construction";

// Custom imports
import PulsatingDot from "../../../components/PulsatingDot.tsx";
import WarningIcon from "@mui/icons-material/Warning";
import { SystemStatusCategory } from "../../../types/perseus/SystemStatusCategory.ts";
import useSystemStatusCategoryColor from "../../system-status/hooks/useSystemStatusCategoryColor.ts";

export default function StatusBarCard({
    name,
    category,
    message,
    activeEntryCount,
    onDetailsClick,
}: {
    name: string;
    category: SystemStatusCategory;
    message: string;
    activeEntryCount: number;
    onDetailsClick?: () => void;
}): React.ReactElement {
    const color = useSystemStatusCategoryColor(category);

    const icon: React.ReactElement = {
        [SystemStatusCategory.RUNNING]: (
            <CheckCircleIcon sx={{ fontSize: "inherit", color }} />
        ),
        [SystemStatusCategory.INFO]: (
            <InfoOutlinedIcon sx={{ fontSize: "inherit", color }} />
        ),
        [SystemStatusCategory.WARNING]: (
            <WarningIcon sx={{ fontSize: "inherit", color }} />
        ),
        [SystemStatusCategory.ERROR]: (
            <ErrorIcon sx={{ fontSize: "inherit", color }} />
        ),
        [SystemStatusCategory.MAINTENANCE]: (
            <ConstructionIcon sx={{ fontSize: "inherit", color }} />
        ),
    }[category];

    return (
        <Card sx={{ flex: 1 }}>
            <CardContent
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    pb: "3px !important",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        pr: 2,
                    }}
                >
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Box sx={{ alignSelf: "center" }}>
                        <PulsatingDot
                            color={color}
                            pulsating={
                                category === SystemStatusCategory.RUNNING
                            }
                            duration={10}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ display: "flex", fontSize: "1.1rem" }}>
                        {icon}
                    </Box>
                    <Typography variant="body2">{message}</Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        mt: 1.5,
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        {activeEntryCount} status{" "}
                        {activeEntryCount === 1 ? "change" : "changes"}{" "}
                        available
                    </Typography>
                    {onDetailsClick !== undefined && (
                        <Button
                            sx={{ mr: -2, mb: -0.5, flexShrink: 0 }}
                            onClick={onDetailsClick}
                        >
                            Details <ChevronRightIcon />
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
