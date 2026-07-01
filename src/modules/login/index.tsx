// React imports
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// MUI imports
import {
    Alert,
    Box,
    Button,
    Paper,
    Typography,
    LinearProgress,
} from "@mui/material";
import type { AlertColor } from "@mui/material/Alert";

// Custom imports
import CONFIG from "../../config.ts";
import type { AuthenticationData } from "../../types/AuthenticationData.ts";
import useAuthentication from "../../contexts/authentication";
import getLoginOptions, { type LoginOption } from "./api/getLoginOptions.ts";

export default function Login({
    alertMessage,
    alertType = "error",
    next = undefined,
}: {
    alertMessage?: string;
    alertType?: AlertColor;
    next?: string;
}): React.ReactElement {
    const [searchParams] = useSearchParams();

    const { authData }: { authData: AuthenticationData } = useAuthentication();

    const [loading, setLoading] = React.useState<boolean>(true);
    const [loginOptions, setLoginOptions] = React.useState<LoginOption[]>([]);
    const [message, setMessage] = React.useState<string | undefined>(
        alertMessage
    );
    const [messageType, setMessageType] = React.useState<
        AlertColor | undefined
    >(alertType);

    const navigate = useNavigate();

    // Fetch login options
    React.useEffect(() => {
        getLoginOptions()
            .then((options) => {
                setLoginOptions(options);
            })
            .catch(() => {
                console.error("Failed to fetch login options");
                setMessageType("error");
                setMessage("Failed to load login methods");
            })
            .finally(() => setLoading(false));
    }, []);

    // Redirect if already logged in
    React.useEffect(() => {
        if (authData.validSession) {
            navigate(next ?? searchParams.get("next") ?? "/");
        }
    }, [authData.validSession]);

    const ldapOption = loginOptions.find(
        (opt) => opt.identifier.toLowerCase() === "ldap"
    );

    const otherOptions = loginOptions.filter(
        (opt) => opt.identifier.toLowerCase() !== "ldap"
    );

    function handleLoginRedirect(identifier?: string) {
        const nextUrl = next ?? searchParams.get("next") ?? "/";
        const url = identifier
            ? `${CONFIG.GATEWAY_URL}/auth/login?kc_idp_hint=${identifier}&next=${encodeURIComponent(nextUrl)}`
            : `${CONFIG.GATEWAY_URL}/auth/login?next=${encodeURIComponent(nextUrl)}`;

        window.location.href = url;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                p: 5,
            }}
        >
            <Paper
                elevation={2}
                sx={{
                    p: 4,
                    width: "90vw",
                    maxWidth: "520px",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    gap: 2,
                }}
            >
                <Typography variant="h5" textAlign="center">
                    Login
                </Typography>

                <Typography
                    variant="body2"
                    textAlign="center"
                    color="text.secondary"
                >
                    Choose your login method
                </Typography>

                {message && <Alert severity={messageType}>{message}</Alert>}

                {loading && <LinearProgress />}

                {/* Provider Buttons */}
                {!loading && (
                    <>
                        {/* LDAP (Primary) */}
                        {ldapOption && (
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() =>
                                    handleLoginRedirect(ldapOption.identifier)
                                }
                            >
                                Continue with {ldapOption.display_name}
                            </Button>
                        )}

                        {/* Divider (only if both exist) */}
                        {ldapOption && otherOptions.length > 0 && (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    my: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        flex: 1,
                                        borderBottom: "1px solid",
                                        borderColor: "divider",
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Other login options
                                </Typography>
                                <Box
                                    sx={{
                                        flex: 1,
                                        borderBottom: "1px solid",
                                        borderColor: "divider",
                                    }}
                                />
                            </Box>
                        )}

                        {/* Other Providers */}
                        {otherOptions.map((option) => (
                            <Button
                                key={option.identifier}
                                variant="outlined"
                                onClick={() =>
                                    handleLoginRedirect(option.identifier)
                                }
                            >
                                Continue with {option.display_name}
                            </Button>
                        ))}

                        {/* Fallback (no LDAP, no others) */}
                        {!ldapOption && otherOptions.length === 0 && (
                            <Button
                                variant="contained"
                                onClick={() => handleLoginRedirect()}
                            >
                                Continue to login
                            </Button>
                        )}
                    </>
                )}
            </Paper>
        </Box>
    );
}
