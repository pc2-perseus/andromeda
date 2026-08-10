// React imports
import React from "react";

// MUI imports
import { Alert, Box, Button, Paper, Typography } from "@mui/material";

// Custom imports
import useLoginOptionsQuery from ".././hooks/useLoginOptionsQuery.ts";
import FormSkeleton from "./FormSkeleton.tsx";

export default function LoginForm(props: {
    onPressLoginOption: (option?: string) => void;
}): React.ReactElement {
    const { onPressLoginOption } = props;
    const { data: options, isPending, isError } = useLoginOptionsQuery();

    if (isError) {
        return (
            <Alert severity="error">
                There was an error fetching the login options
            </Alert>
        );
    }

    if (isPending) {
        return <FormSkeleton />;
    }

    const ldapOption = options.find(
        (opt) => opt.identifier.toLowerCase() === "ldap"
    );

    const otherOptions = options.filter(
        (opt) => opt.identifier.toLowerCase() !== "ldap"
    );

    return (
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
            <Typography variant="h5" sx={{ textAlign: "center" }}>
                Login
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center" }}
            >
                Choose your login method
            </Typography>

            {/* Provider Buttons */}
            {/* LDAP (Primary) */}
            {ldapOption && (
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => onPressLoginOption(ldapOption.identifier)}
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
                    <Typography variant="body2" color="text.secondary">
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
                    onClick={() => onPressLoginOption(option.identifier)}
                >
                    Continue with {option.display_name}
                </Button>
            ))}

            {/* Fallback (no LDAP, no others) */}
            {!ldapOption && otherOptions.length === 0 && (
                <Button
                    variant="contained"
                    onClick={() => onPressLoginOption()}
                >
                    Continue to login
                </Button>
            )}
        </Paper>
    );
}
