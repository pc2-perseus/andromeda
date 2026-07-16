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
    const [email, setEmail] = React.useState<string>("");

    React.useEffect(() => {
        setEmail(auth.person?.email ?? "");
    }, [auth.person?.email]);

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

    const validationError = validateProfileEmail(email);
    const normalizedEmail = email.trim();
    const isUnchanged = normalizedEmail === auth.person.email;

    function updateEmail() {
        if (validationError === null) {
            saveMutation.mutate(normalizedEmail);
        }
    }

    return (
        <>
            <Typography variant="h4">Email</Typography>
            <Grid container spacing={2}>
                {saveMutation.isError && (
                    <Grid size={12}>
                        <Alert severity="error">
                            There was an error saving your email address.
                        </Alert>
                    </Grid>
                )}
                <Grid size={{ xs: 12, md: 5 }}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        error={validationError !== null}
                        helperText={validationError ?? " "}
                        fullWidth
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                </Grid>
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
