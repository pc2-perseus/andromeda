// React imports
import React from "react";

// MUI imports
import { Box, Collapse } from "@mui/material";

// Icon imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Custom imports
import type { FooterLinkCollection } from "../types/FooterLinkCollection.ts";

export default function MobileLinkCollection({
    collection,
}: {
    collection: FooterLinkCollection;
}): React.ReactElement {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <>
            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.25rem",
                }}
                onClick={() => setOpen((prev) => !prev)}
            >
                <Box>{collection.header.title}</Box>
                <ExpandMoreIcon
                    sx={{
                        display: "inline-flex",
                        transition: "transform 0.3s ease",
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                />
            </Box>
            <Collapse in={open} timeout={300}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        ml: "20px",
                        width: "calc(100% - 20px)",
                    }}
                >
                    {collection.items.map((item, index: number) => (
                        <Box
                            key={index}
                            component="a"
                            href={item.href}
                            target={item.target}
                            sx={{
                                color: "inherit",
                                textDecoration: "none",
                                p: 1,
                                fontSize: "1.25rem",
                            }}
                        >
                            {item.title}
                        </Box>
                    ))}
                </Box>
            </Collapse>
        </>
    );
}
