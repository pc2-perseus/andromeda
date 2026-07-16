// React imports
import React from "react";

// MUI imports
import {
    Autocomplete,
    Alert,
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";

// Custom imports
import useAuth from "../../../../hooks/useAuth.ts";
import useSaveNationalitiesMutation from "../../hooks/useSaveNationalitiesMutation.ts";

export default function Nationalities({
    nationalities,
}: {
    nationalities: { name: string; iso_code: string }[];
}): React.ReactElement {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [validationError, setValidationError] = React.useState<string | null>(
        null
    );

    const auth = useAuth();
    const saveMutation = useSaveNationalitiesMutation();

    const [selectedNationalities, setSelectedNationalities] = React.useState<
        string[]
    >([]);

    function updateNationalities() {
        setValidationError(null);
        if (selectedNationalities.length === 0) {
            setValidationError("Please select at least one nationality.");
            return;
        }

        saveMutation.mutate(selectedNationalities);
    }

    React.useEffect(() => {
        setSelectedNationalities(auth.person?.nationalities ?? []);
        setLoading(false);
    }, [auth]);

    if (loading || auth.person === null) {
        return <></>;
    }

    const originalNationalities = auth.person.nationalities ?? [];
    const isUnchanged =
        selectedNationalities.length === originalNationalities.length &&
        selectedNationalities.every((val) =>
            originalNationalities.includes(val)
        );

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
                    setSelectedNationalities(newValues);
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
                    disabled={saveMutation.isPending || isUnchanged}
                    onClick={updateNationalities}
                >
                    Save changes
                </Button>
            </Box>
        </>
    );
}
