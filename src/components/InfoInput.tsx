// React imports
import React, { type ReactNode } from "react";

// MUI imports
import { Box, Dialog, DialogContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Icon imports
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Custom imports
import parseMarkdown from "../utils/parseMarkdown.ts";

export default function InfoInput({
    children,
    infoText,
}: {
    infoText?: string | null;
    children: ReactNode;
}): React.ReactElement {
    const [open, setOpen] = React.useState<boolean>(false);
    const theme = useTheme();
    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    display: { xs: "none", md: "block" },
                }}
            >
                {children}
                <InfoOutlinedIcon
                    sx={{
                        position: "absolute",
                        ml: 1,
                        alignSelf: "center",
                        cursor: "pointer",
                        color:
                            theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.54)"
                                : "rgba(0, 0, 0, 0.54)",
                        "&:hover": {
                            color: "primary.main",
                        },
                        visibility:
                            infoText === undefined || infoText === null
                                ? "hidden"
                                : undefined,
                        transition: (theme) =>
                            theme.transitions.create(["color"], {
                                duration: theme.transitions.duration.short,
                                easing: theme.transitions.easing.easeInOut,
                            }),
                    }}
                    onClick={() => setOpen(true)}
                />
            </Box>
            <Box
                sx={{
                    display: { xs: "flex", md: "none" },
                    gap: 1,
                    width: "100%",
                }}
            >
                <Box sx={{ flexGrow: 1 }}>{children}</Box>
                {infoText !== undefined && infoText !== null && (
                    <InfoOutlinedIcon
                        sx={{
                            alignSelf: "center",
                            cursor: "pointer",
                            color:
                                theme.palette.mode === "dark"
                                    ? "rgba(255, 255, 255, 0.54)"
                                    : "rgba(0, 0, 0, 0.54)",
                            "&:hover": {
                                color: "primary.main",
                            },
                            transition: (theme) =>
                                theme.transitions.create(["color"], {
                                    duration: theme.transitions.duration.short,
                                    easing: theme.transitions.easing.easeInOut,
                                }),
                        }}
                        onClick={() => setOpen(true)}
                    />
                )}
            </Box>
            {infoText !== undefined && infoText !== null && (
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    maxWidth="md"
                >
                    <DialogContent>{parseMarkdown(infoText)}</DialogContent>
                </Dialog>
            )}
        </>
    );
}
