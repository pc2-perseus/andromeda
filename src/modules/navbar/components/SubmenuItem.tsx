// React imports
import React from "react";
import { Link } from "react-router-dom";

// MUI imports
import { Box } from "@mui/material";

// Icon imports
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

// Custom imports
import type { NavbarItem } from "../types/NavbarItem.ts";
import sortNavbarItems from "../functions/sortNavbarItems.ts";

export default function SubmenuItem({
    item,
    onClick,
}: {
    item: NavbarItem;
    onClick: () => void;
}): React.ReactElement {
    const [open, setOpen] = React.useState<boolean>(false);
    const isPlaceholderLink = item.href === "#";

    const children: NavbarItem[] =
        item.children === undefined ? [] : item.children.sort(sortNavbarItems);

    return (
        <Box
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={(event) => {
                if (isPlaceholderLink) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                }
                setOpen(false);
                onClick();
            }}
            sx={{
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
                width: "100%",
                p: 2,
                cursor: "pointer",
                "&:hover": { backgroundColor: "primary.main" },
                transition: (theme) =>
                    theme.transitions.create(["background-color"], {
                        duration: theme.transitions.duration.short,
                        easing: theme.transitions.easing.easeInOut,
                    }),
            }}
        >
            <Box
                component={Link}
                to={item.href}
                target={item.target}
                sx={{
                    color: "inherit",
                    textDecoration: "none",
                    width: "100%",
                    height: "100%",
                }}
            >
                {item.title}
            </Box>
            {item.children !== undefined && item.children.length > 0 && (
                <ArrowRightIcon />
            )}
            {item.children !== undefined && item.children.length > 0 && (
                <Box
                    sx={{
                        position: "absolute",
                        left: "100%",
                        top: 0,
                        minWidth: "200px",
                        boxShadow: 3,
                        visibility: open ? "visible" : "hidden",
                        opacity: open ? 1 : 0,
                        backgroundColor: "primary.dark",
                        transition: (theme) =>
                            theme.transitions.create(["opacity"], {
                                duration: theme.transitions.duration.short,
                                easing: theme.transitions.easing.easeInOut,
                            }),
                    }}
                >
                    {children.map((child: NavbarItem, index: number) => (
                        <SubmenuItem
                            key={index}
                            onClick={() => {
                                setOpen(false);
                                onClick();
                            }}
                            item={child}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}
