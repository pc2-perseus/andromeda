import React from "react";

// MUI imports
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography,
} from "@mui/material";

import useAuth from "../../../../hooks/useAuth";
import useSaveEmailMutation from "../../hooks/useSaveEmailMutation.ts";
import { validateProfileEmail } from "../../utils/emailValidation.ts";

export default function Email(): React.ReactElement {
    const auth = useAuth();
    const saveMutation = useSaveEmailMutation();
    const [draftEmail, setDraftEmail] = React.useState<string | null>(null);

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

    const email = draftEmail ?? auth.person.email;
    const validationError = validateProfileEmail(email);
    const normalizedEmail = email.trim();
    const isUnchanged = normalizedEmail === auth.person.email;

    function updateEmail() {
        if (validationError === null) {
            void saveMutation.mutateAsync(normalizedEmail).then(() => {
                setDraftEmail(null);
            });
        }
    }

    return (
        <>
            <Typography variant="h4">Email</Typography>
            <Grid container>
                {saveMutation.isError && (
                    <Grid size={12}>
                        <Alert severity="error">
                            There was an error saving your email address.
                        </Alert>
                    </Grid>
                )}
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(event) => setDraftEmail(event.target.value)}
                    error={validationError !== null}
                    helperText={validationError ?? " "}
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
                <Grid size={12}>
                    <Button
                        variant="contained"
                        sx={{ float: "right" }}
                        disabled={
                            saveMutation.isPending ||
                            validationError !== null ||
                            isUnchanged
                        }
                        onClick={updateEmail}
                    >
                        Save changes
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
