// React imports
import React from "react";

// MUI imports
import {
    Box,
    CircularProgress,
    Grid,
    TextField,
    Typography,
} from "@mui/material";

// Custom imports
import type { AuthenticationData } from "../../../../types/AuthenticationData.ts";
import useAuthentication from "../../../../contexts/authentication";

export default function Name(): React.ReactElement {
    const {
        authData,
        loading,
    }: {
        authData: AuthenticationData;
        loading: boolean;
    } = useAuthentication();

    if (loading || authData.person === null) {
        return (
            <Box
                sx={{
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Typography variant="h4">Name</Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 2 }}>
                    <TextField
                        label="Title"
                        value={authData.person.title ?? ""}
                        disabled
                        fullWidth
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                    <TextField
                        label="Firstname"
                        value={authData.person.firstname}
                        disabled
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                    <TextField
                        label="Lastname"
                        value={authData.person.lastname}
                        disabled
                        fullWidth
                    />
                </Grid>
            </Grid>
        </>
    );
}
