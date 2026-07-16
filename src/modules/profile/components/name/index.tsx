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
import useAuth from "../../../../hooks/useAuth.ts";

export default function Name(): React.ReactElement {
    const auth = useAuth();

    if (auth.person === null) {
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
                        value={auth.person.title ?? ""}
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
                        value={auth.person.firstname}
                        disabled
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                    <TextField
                        label="Lastname"
                        value={auth.person.lastname}
                        disabled
                        fullWidth
                    />
                </Grid>
            </Grid>
        </>
    );
}
