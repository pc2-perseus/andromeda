// React imports
import React from "react";
import { Link } from "react-router-dom";

// MUI imports
import { Box, Collapse } from "@mui/material";

// Icon imports
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Custom imports
import type { NavbarItem } from "../types/NavbarItem.ts";
import sortNavbarItems from "../functions/sortNavbarItems.ts";

export default function MobileMenuButton({
    item,
    onClose,
}: {
    item: NavbarItem;
    onClose: () => void;
}): React.ReactElement {
    const [open, setOpen] = React.useState<boolean>(false);

    const children: NavbarItem[] =
        item.children === undefined ? [] : item.children.sort(sortNavbarItems);

    function toggleSubmenu() {
        if (children.length > 0) {
            setOpen((prev) => !prev);
        }
    }

    return (
        <>
            <Box
                component={Link}
                to={item.href}
                target={item.target}
                onClick={() => {
                    if (children.length > 0) {
                        toggleSubmenu();
                    } else {
                        onClose();
                        setOpen(false);
                    }
                }}
                sx={{
                    p: 2,
                    display: "flex",
                    cursor: "pointer",
                    color: "#fff",
                    textDecoration: "none",
                    "&:hover": { backgroundColor: "primary.dark" },
                    transition: (theme) =>
                        theme.transitions.create(["background-color"], {
                            duration: theme.transitions.duration.short,
                            easing: theme.transitions.easing.easeInOut,
                        }),
                }}
            >
                <Box sx={{ flexGrow: 1 }}>{item.title}</Box>

                {children.length > 0 && (
                    <ChevronRightIcon
                        sx={{
                            display: "inline-flex",
                            transition: "transform 0.3s ease",
                            transform: open ? "rotate(90deg)" : "rotate(0deg)",
                            cursor: "pointer",
                        }}
                    />
                )}
            </Box>
            {children.length > 0 && (
                <Collapse in={open} timeout={300}>
                    <Box
                        sx={{
                            ml: "20px",
                            width: "calc(100% - 20px)",
                        }}
                    >
                        {children.map((child: NavbarItem, index: number) => (
                            <MobileMenuButton
                                key={index}
                                item={child}
                                onClose={() => {
                                    onClose();
                                    setOpen(false);
                                }}
                            />
                        ))}
                    </Box>
                </Collapse>
            )}
        </>
    );
}
