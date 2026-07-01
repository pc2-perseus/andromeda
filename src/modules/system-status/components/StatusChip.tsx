import React from "react";
import { Chip } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { getSystemStatusCategoryColor } from "../functions/systemStatus.ts";
import type { SystemStatusCategory } from "../../../types/perseus/SystemStatusCategory.ts";

export default function StatusChip({
    category,
    label,
    sx,
}: {
    category: SystemStatusCategory;
    label: string;
    sx?: SxProps<Theme>;
}): React.ReactElement {
    return (
        <Chip
            label={label}
            color={getSystemStatusCategoryColor(category)}
            variant="outlined"
            size="small"
            sx={{
                height: 28,
                ".MuiChip-label": {
                    px: 1.25,
                },
                ...sx,
            }}
        />
    );
}
