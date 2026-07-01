// React imports
import React from "react";
import { Link, useLocation } from "react-router-dom";

// MUI imports
import {
    Box,
    Button,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
} from "@mui/material";

// Icon imports
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

// Custom imports
import type { AuthenticationData } from "../../../types/AuthenticationData.ts";
import useAuthentication from "../../../contexts/authentication";

export default function LoginButton(): React.ReactElement {
    const [menuAnchor, setMenuAnchor] = React.useState<HTMLElement | null>(
        null
    );

    const { authData }: { authData: AuthenticationData } = useAuthentication();
    const location = useLocation();

    return (
        <>
            <Box sx={{ mr: 1, height: "100%", display: "flex" }}>
                {authData.validSession ? (
                    <IconButton
                        color="inherit"
                        onClick={(e) => setMenuAnchor(e.currentTarget)}
                    >
                        <AccountCircleIcon sx={{ fontSize: "1.5em" }} />
                    </IconButton>
                ) : (
                    <Button
                        component={Link}
                        variant="outlined"
                        to={`/login?next=${location.pathname}`}
                        color="inherit"
                        sx={{
                            "&:hover": {
                                backgroundColor: "#fff",
                                color: "primary.main",
                            },
                        }}
                    >
                        Login
                    </Button>
                )}
            </Box>
            <Menu
                anchorEl={menuAnchor}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={menuAnchor !== null}
                onClose={() => setMenuAnchor(null)}
                disableScrollLock
            >
                <MenuList dense sx={{ pt: 0, pb: 0 }}>
                    <MenuItem
                        component={Link}
                        to="/profile"
                        onClick={() => setMenuAnchor(null)}
                    >
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        to="/logout"
                        onClick={() => setMenuAnchor(null)}
                    >
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
}
