// React imports
import React from "react";

// MUI imports
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";

// Custom imports
import useSaveNationalitiesMutation from "../../hooks/useSaveNationalitiesMutation.ts";
import useAuthQuery from "../../../../hooks/useAuthQuery.ts";

export default function Nationalities({
    nationalities,
}: {
    nationalities: { name: string; iso_code: string }[];
}): React.ReactElement {
    const { data: auth } = useAuthQuery();
    const saveMutation = useSaveNationalitiesMutation();
    const [validationError, setValidationError] = React.useState<string | null>(
        null
    );

    const person = auth.person;
    if (person === null) {
        throw new Error("Person should never be null here");
    }

    const [draft, setDraft] = React.useState<string[] | null>(null);
    const selectedNationalities = draft ?? person.nationalities;

    function updateNationalities() {
        if (selectedNationalities.length === 0) {
            setValidationError("Please select at least one nationality.");
            return;
        }

        void saveMutation
            .mutateAsync(selectedNationalities)
            .then(() => setDraft(null));
    }

    return (
        <>
            <Typography variant="h4">Nationalities</Typography>
            <Typography>
                To ensure the appropriate execution of export control
                procedures, we require your nationalities.
            </Typography>
            {saveMutation.isError && (
                <Alert severity="error">
                    There was an error saving your nationalities.
                </Alert>
            )}
            <Autocomplete
                value={selectedNationalities}
                onChange={(_e, newValues: string[]) => {
                    setDraft(newValues);
                    if (newValues.length > 0) setValidationError(null);
                }}
                options={nationalities
                    .sort((n1, n2) => n1.name.localeCompare(n2.name))
                    .map((n) => n.iso_code)}
                getOptionLabel={(option) =>
                    nationalities.filter((n) => n.iso_code === option)[0]
                        ?.name ?? ""
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Nationalities"
                        error={Boolean(validationError)}
                        helperText={validationError}
                    />
                )}
                multiple
            />
            <Box>
                <Button
                    variant="contained"
                    sx={{ float: "right" }}
                    disabled={
                        saveMutation.isPending ||
                        selectedNationalities === person.nationalities
                    }
                    onClick={updateNationalities}
                >
                    Save changes
                </Button>
            </Box>
        </>
    );
}
