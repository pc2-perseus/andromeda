import React from "react";
import { amber, blue, green, purple, red } from "@mui/material/colors";
import { SystemStatusCategory } from "../../../types/perseus/SystemStatusCategory.ts";

const CATEGORY_COLORS: Record<SystemStatusCategory, string> = {
    [SystemStatusCategory.RUNNING]: green[500],
    [SystemStatusCategory.INFO]: blue[500],
    [SystemStatusCategory.WARNING]: amber[700],
    [SystemStatusCategory.ERROR]: red[600],
    [SystemStatusCategory.MAINTENANCE]: purple[500],
};

export default function useSystemStatusCategoryColor(
    category: SystemStatusCategory
): string {
    return React.useMemo((): string => CATEGORY_COLORS[category], [category]);
}
