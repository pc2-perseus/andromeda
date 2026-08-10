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
import useUpdateOrcidMutation from "../../hooks/useUpdateOrcidMutation.ts";
import { validateOrcid } from "../../utils/orcidValidation.ts";

export default function Orcid(): React.ReactElement {
    const auth = useAuth();
    const updateOrcidMutation = useUpdateOrcidMutation();
    const [draftOrcid, setDraftOrcid] = React.useState<string | null>(null);

    const [isTouched, setIsTouched] = React.useState<boolean>(false);

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

    const orcid = draftOrcid ?? auth.person.orcid;
    const validationError = validateOrcid(orcid);
    const isUnchanged = orcid === auth.person.orcid;

    const showError = isTouched && validationError !== null;

    function updateOrcid() {
        setIsTouched(true);
        if (validationError === null) {
            void updateOrcidMutation.mutateAsync(orcid as string).then(() => {
                setDraftOrcid(null);
                setIsTouched(false);
            });
        }
    }

    return (
        <>
            <Typography variant="h4">Orcid</Typography>
            <Grid>
                {updateOrcidMutation.isError && (
                    <Grid size={12}>
                        <Alert severity="error">
                            There was an error saving your orcid.
                        </Alert>
                    </Grid>
                )}
                <TextField
                    label="Orcid"
                    type="text"
                    value={orcid ?? ""}
                    onChange={(event) => {
                        setDraftOrcid(event.target.value);
                        setIsTouched(true);
                    }}
                    onBlur={() => setIsTouched(true)}
                    error={showError}
                    helperText={
                        showError && validationError instanceof Error
                            ? validationError.message
                            : " "
                    }
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
                            updateOrcidMutation.isPending ||
                            validationError !== null ||
                            isUnchanged
                        }
                        onClick={updateOrcid}
                    >
                        Save changes
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
