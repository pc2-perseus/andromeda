// React imports
import React from "react";

// MUI imports
import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Icon imports
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

// Custom imports
import type { FooterLinkCollection } from "./types/FooterLinkCollection.ts";
import MobileLinkCollection from "./components/MobileLinkCollection.tsx";

export default function Footer({
    updateMode,
}: {
    updateMode?: (isDarkMode: boolean) => void;
}): React.ReactElement {
    const linkCollection: FooterLinkCollection[] = [
        {
            header: {
                title: "What we offer",
                href: "https://pc2.uni-paderborn.de/system-access",
            },
            items: [
                {
                    title: "Hardware",
                    href: "https://pc2.uni-paderborn.de/systems-and-services/systems-comparison#c942123",
                },
                {
                    title: "Software",
                    href: "https://pc2.uni-paderborn.de/systems-and-services#c854999",
                },
                {
                    title: "Service",
                    href: "https://pc2.uni-paderborn.de/systems-and-services#c936197",
                },
            ],
        },
        {
            header: {
                title: "Available systems",
                href: "https://pc2.uni-paderborn.de/systems-and-services#available-systems",
            },
            items: [
                {
                    title: "Otus",
                    href: "https://pc2.uni-paderborn.de/systems-and-services/otus",
                },
                {
                    title: "Noctua 2",
                    href: "https://pc2.uni-paderborn.de/systems-and-services/noctua-2",
                },
                {
                    title: "FPGA research clusters",
                    href: "https://pc2.uni-paderborn.de/systems-and-services/fpga-research-cluster",
                },
            ],
        },
        {
            header: {
                title: "Documentation",
                href: "https://doku.pc2.upb.de/",
            },
            items: [
                {
                    title: "Getting started",
                    href: "https://doku.pc2.uni-paderborn.de/getting-started",
                },
                {
                    title: "Job submission",
                    href: "https://doku.pc2.uni-paderborn.de/job-submission",
                },
                {
                    title: "Software",
                    href: "https://doku.pc2.uni-paderborn.de/software",
                },
            ],
        },
        {
            header: {
                title: "About PC2",
                href: "https://pc2.uni-paderborn.de/about",
            },
            items: [
                {
                    title: "News",
                    href: "https://pc2.uni-paderborn.de/about/announcements/news-events",
                },
                {
                    title: "Events",
                    href: "https://events.uni-paderborn.de/",
                },
                {
                    title: "Job offers",
                    href: "https://pc2.uni-paderborn.de/#job-offers",
                },
            ],
        },
    ];

    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: "primary.main",
                px: { xs: 3, md: "10vw" },
                pb: 4,
                pt: 4,
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                a: {
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": {
                        textDecoration: "underline",
                    },
                },
            }}
        >
            <Box
                sx={{
                    display: { xs: "none", lg: "flex" },
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}
            >
                {linkCollection.map(
                    (entry: FooterLinkCollection, index: number) => (
                        <Box key={index}>
                            <Typography
                                variant="button"
                                component="a"
                                href={entry.header.href}
                                sx={{ fontSize: "1.2rem" }}
                            >
                                {entry.header.title}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    a: {
                                        my: 1,
                                    },
                                }}
                            >
                                {entry.items.map((item, index2: number) => (
                                    <a
                                        key={index2}
                                        href={item.href}
                                        target={item.target}
                                    >
                                        {item.title}
                                    </a>
                                ))}
                            </Box>
                        </Box>
                    )
                )}
            </Box>
            <Box sx={{ display: { lg: "none" } }}>
                {linkCollection.map(
                    (entry: FooterLinkCollection, index: number) => (
                        <React.Fragment key={index}>
                            {index > 0 && <Divider sx={{ my: 2 }} />}
                            <MobileLinkCollection collection={entry} />
                        </React.Fragment>
                    )
                )}
            </Box>
            <Divider sx={{ my: 4 }} />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}
            >
                <Box
                    sx={{
                        maxWidth: { xs: undefined, md: "300px" },
                        width: { xs: "100%", md: undefined },
                    }}
                >
                    <img
                        src="/icon_long.png"
                        style={{
                            width: "100%",
                            marginRight: "6px",
                            filter: "brightness(0) invert(1)",
                        }}
                        alt="logo"
                    />
                </Box>
                <Box
                    sx={{ flexGrow: 1, display: { xs: "none", md: undefined } }}
                />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: { xs: 1, md: undefined },
                        justifyContent: { xs: "space-between", md: "flex-end" },
                        mt: { xs: 3, md: undefined },
                        fontSize: { xs: "1.25rem", md: "1rem" },
                        a: {
                            ml: { xs: undefined, md: 3 },
                        },
                    }}
                >
                    <a href="">Privacy</a>
                    <a href="">Legal note</a>
                    {updateMode !== undefined && (
                        <Tooltip
                            title={`Switch to ${theme.palette.mode === "dark" ? "light" : "dark"} mode`}
                            placement="top"
                        >
                            <IconButton
                                sx={{
                                    color: "#fff",
                                    ml: { xs: undefined, md: 2 },
                                }}
                                onClick={() =>
                                    updateMode(theme.palette.mode !== "dark")
                                }
                            >
                                {theme.palette.mode === "dark" ? (
                                    <DarkModeIcon />
                                ) : (
                                    <LightModeIcon />
                                )}
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
