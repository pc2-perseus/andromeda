// React imports
import React from "react";
import { Box } from "@mui/material";

export default function PulsatingDot({
    color,
    pulsating = true,
    duration = 5,
}: {
    color: string;
    pulsating?: boolean;
    duration?: number;
}): React.ReactElement {
    return (
        <Box
            sx={{
                position: "relative",
                height: "25px",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    borderWidth: `2px`,
                    borderStyle: "solid",
                    borderColor: color,
                    width: "25px",
                    height: "25px",
                    opacity: 0,
                    borderRadius: "30px",
                    animation: pulsating
                        ? `pulsatingDot ${duration}s ease-out infinite`
                        : undefined,
                    "@keyframes pulsatingDot": {
                        "0%": { transform: "scale(0.1)", opacity: 0 },
                        "50%": { transform: "scale(0.1)", opacity: 0 },
                        "75%": { opacity: 1 },
                        "100%": { transform: "scale(1.2)", opacity: 0 },
                    },
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    backgroundColor: color,
                    top: "5px",
                    left: "5px",
                }}
            />
        </Box>
    );
}
