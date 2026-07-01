// React imports
import React from "react";
import { Link } from "react-router-dom";

// MUI imports
import { Box, Button, Typography } from "@mui/material";

// Icon imports
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Custom imports
import type { NavbarItem } from "../types/NavbarItem.ts";
import sortNavbarItems from "../functions/sortNavbarItems.ts";
import SubmenuItem from "./SubmenuItem.tsx";

export default function NavbarItemButton({
    item,
}: {
    item: NavbarItem;
}): React.ReactElement {
    const [open, setOpen] = React.useState<boolean>(false);
    const isPlaceholderLink = item.href === "#";

    const children: NavbarItem[] =
        item.children === undefined ? [] : item.children.sort(sortNavbarItems);

    return (
        <Box onMouseLeave={() => setOpen(false)} sx={{ position: "relative" }}>
            <Button
                component={Link}
                to={item.href}
                target={item.target}
                onMouseEnter={() => setOpen(true)}
                onClick={(event) => {
                    if (isPlaceholderLink) {
                        event.preventDefault();
                        return;
                    }
                    setOpen(false);
                }}
                sx={{
                    color: "white",
                    height: "100%",
                    display: "flex",
                    backgroundColor: open ? "primary.dark" : undefined,
                    "&:hover": {
                        backgroundColor: "primary.dark",
                    },
                    borderRadius: 0,
                    pr: children.length === 0 ? 1.5 : undefined,
                    pl: 1.5,
                }}
            >
                <Typography textTransform="none">{item.title}</Typography>

                {children.length > 0 && <ArrowDropDownIcon />}
            </Button>
            <Box
                sx={{
                    position: "absolute",
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
                        onClick={() => setOpen(false)}
                        item={child}
                    />
                ))}
            </Box>
        </Box>
    );
}
