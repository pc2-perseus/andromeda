import React from "react";
import { Chip } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import useSystemStatusCategoryColor from "../hooks/useSystemStatusCategoryColor.ts";
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
    const color = useSystemStatusCategoryColor(category);

    return (
        <Chip
            label={label}
            variant="outlined"
            size="small"
            sx={{
                height: 28,
                color,
                borderColor: color,
                ".MuiChip-label": {
                    px: 1.25,
                },
                ...sx,
            }}
        />
    );
}
