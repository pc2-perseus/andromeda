import React from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { SystemStatusCategory } from "../../../types/perseus/SystemStatusCategory.ts";
import type { SystemStatusServiceItem } from "../types/SystemStatusGroup.ts";
import StatusChip from "./StatusChip.tsx";

export default function GroupCardEntry({
    serviceItem,
    onClick,
}: {
    serviceItem: SystemStatusServiceItem;
    onClick: () => void;
}): React.ReactElement {
    const topEntry = serviceItem.topEntry;

    return (
        <ButtonBase
            onClick={() => onClick()}
            sx={{
                width: "100%",
                alignItems: "stretch",
                textAlign: "left",
                borderRadius: 1,
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: "action.hover",
                },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    py: 0.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 2,
                    flexWrap: "nowrap",
                }}
            >
                <Box
                    sx={{
                        minWidth: 0,
                        flexGrow: 1,
                    }}
                >
                    <Typography variant="h6">
                        {serviceItem.service.name}
                    </Typography>
                    {topEntry !== null && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mt: 0.5,
                            }}
                        >
                            {topEntry.title}
                        </Typography>
                    )}
                </Box>
                <StatusChip
                    category={
                        topEntry?.category ?? SystemStatusCategory.RUNNING
                    }
                    label={topEntry?.status_type ?? "running"}
                    sx={{
                        flexShrink: 0,
                        alignSelf: "flex-start",
                    }}
                />
            </Box>
        </ButtonBase>
    );
}
