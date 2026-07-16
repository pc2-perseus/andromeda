import React from "react";
import { alpha, Chip, Skeleton, useTheme } from "@mui/material";
import useStateEventColor from "../hooks/useStateEventColor.ts";
import useStateEventName from "../hooks/useStateEventName.ts";
import useFrontendConfigurationQuery from "../hooks/useFrontendConfigurationQuery.ts";

export default function StateChip({
    state,
}: {
    state: string;
}): React.ReactElement {
    const theme = useTheme();
    const { isPending } = useFrontendConfigurationQuery();
    const name = useStateEventName(state);
    const color = useStateEventColor(state);

    const content = isPending ? <Skeleton width={80} /> : name;

    return (
        <Chip
            label={content}
            size="small"
            variant="outlined"
            sx={{
                bgcolor: color ? alpha(color, 0.12) : "background.paper",
                borderColor: color ? alpha(color, 0.5) : undefined,
                color: color ? theme.palette.text.primary : undefined,
            }}
        />
    );
}
