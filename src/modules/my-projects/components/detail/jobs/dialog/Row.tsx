import React from "react";
import { Box } from "@mui/material";

export default function Row({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}): React.ReactElement {
    return (
        <Box component="tr">
            <Box
                component="td"
                sx={{
                    verticalAlign: "top",
                    pr: 3,
                    py: 1,
                    color: "text.secondary",
                    whiteSpace: "nowrap",
                }}
            >
                {label}
            </Box>
            <Box component="td" sx={{ verticalAlign: "top", py: 1 }}>
                {value}
            </Box>
        </Box>
    );
}
