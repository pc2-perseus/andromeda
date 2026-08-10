// React imports
import React from "react";
import { Link } from "react-router-dom";

// MUI imports
import {
    Alert,
    AppBar,
    Box,
    CircularProgress,
    IconButton,
    Slide,
    Snackbar,
    Toolbar,
    Typography,
} from "@mui/material";

// Icon imports
import MenuIcon from "@mui/icons-material/Menu";

// Custom imports
import type { NavbarItem } from "./types/NavbarItem.ts";
import NavbarItemButton from "./components/NavbarItemButton.tsx";
import MobileMenuButton from "./components/MobileMenuButton.tsx";
import getModuleNavbarItems from "./functions/getModuleNavbarItems.ts";
import filterNavbarItemsByAuthContext from "./functions/filterNavbarItemsByAuthContext.ts";
import mergeDuplicateNavbarItems from "./functions/mergeDuplicateNavbarItems.ts";
import sortNavbarItems from "./functions/sortNavbarItems.ts";
import filterEnabledNavbarItems from "./functions/filterEnabledNavbarItems.ts";
import LoginButton from "./components/LoginButton.tsx";
import Logo from "../../components/Logo.tsx";
import useSave from "../compute-proposal/hooks/useSave.ts";
import useConfig from "../../hooks/useConfig.ts";
import useAuth from "../../hooks/useAuth.ts";

const moduleNavbarItems: { [key: string]: NavbarItem[] } = getModuleNavbarItems(
    import.meta.glob<{ navbar: NavbarItem[] }>("../**/navbar.ts", {
        eager: true,
    })
);

export default function Navbar(): React.ReactElement {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
    const auth = useAuth();
    const config = useConfig();
    const { isSaving, error: saveError } = useSave();
    const [dismissedSaveError, setDismissedSaveError] = React.useState<
        string | null
    >(null);
    const snackbarOpen = Boolean(saveError && saveError !== dismissedSaveError);

    function closeSaveErrorSnackbar() {
        setDismissedSaveError(saveError);
    }

    const navbarItems: NavbarItem[] = mergeDuplicateNavbarItems(
        filterEnabledNavbarItems(moduleNavbarItems, config)
    ).sort(sortNavbarItems);

    const filteredNavbarItems: NavbarItem[] = filterNavbarItemsByAuthContext(
        navbarItems,
        auth.validSession
    );

    return (
        <>
            <AppBar position="sticky" enableColorOnDark sx={{ zIndex: 1200 }}>
                <Toolbar sx={{ pl: "0px !important", pr: "0px !important" }}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => setMobileMenuOpen((prev) => !prev)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    <Box
                        component={Link}
                        to="/my-projects"
                        sx={{
                            cursor: { xs: undefined, md: "pointer" },
                            display: { xs: undefined, md: "flex" },
                            flexGrow: { xs: 1, md: 0 },
                            alignItems: "center",
                            alignSelf: "stretch",
                            px: { xs: undefined, md: 2 },
                            mt: { xs: "5px", md: 0 },
                            whiteSpace: "nowrap",
                            "&:hover": {
                                backgroundColor: {
                                    xs: undefined,
                                    md: "primary.dark",
                                },
                            },
                            transition: (theme) =>
                                theme.transitions.create(["background-color"], {
                                    duration: theme.transitions.duration.short,
                                    easing: theme.transitions.easing.easeInOut,
                                }),
                            img: {
                                mt: { md: "-3px" },
                            },
                            color: "background.default",
                        }}
                    >
                        <Logo
                            style={{
                                height: "2.5em",
                            }}
                            color="#fff"
                        />
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            alignSelf: "stretch",
                        }}
                    >
                        {filteredNavbarItems.map(
                            (item: NavbarItem, index: number) => (
                                <NavbarItemButton key={index} item={item} />
                            )
                        )}
                    </Box>
                    {isSaving && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                pr: 2,
                            }}
                        >
                            <CircularProgress size={16} color="inherit" />
                            <Typography variant="body2" sx={{ mb: "1px" }}>
                                Saving...
                            </Typography>
                        </Box>
                    )}
                    {config.enabled_modules.includes("login") && (
                        <LoginButton />
                    )}
                </Toolbar>
            </AppBar>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={closeSaveErrorSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={closeSaveErrorSnackbar}
                    severity="error"
                    variant="filled"
                >
                    {saveError ?? "Save failed"}
                </Alert>
            </Snackbar>
            {mobileMenuOpen && (
                <Box
                    onClick={() => setMobileMenuOpen(false)}
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        zIndex: 1199,
                    }}
                />
            )}
            <Slide
                direction="right"
                in={mobileMenuOpen}
                mountOnEnter
                unmountOnExit
            >
                <Box
                    sx={{
                        position: "fixed",
                        top: "3.5em",
                        height: "calc(100vh - 3.5em)",
                        width: "70vw",
                        zIndex: 1200,
                    }}
                >
                    <Box
                        sx={{
                            height: "100%",
                            width: "100%",
                            backgroundColor: "primary.main",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                        }}
                    >
                        {filteredNavbarItems.map(
                            (item: NavbarItem, index: number) => (
                                <MobileMenuButton
                                    key={index}
                                    item={item}
                                    onClose={() => setMobileMenuOpen(false)}
                                />
                            )
                        )}
                    </Box>
                </Box>
            </Slide>
        </>
    );
}
