// React imports
import React from "react";

// MUI imports
import {
    Autocomplete,
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";

// Custom imports
import type { AuthenticationData } from "../../../../types/AuthenticationData.ts";
import useAuthentication from "../../../../contexts/authentication";
import saveNationalities from "../../api/saveNationalities.ts";

export default function Nationalities({
    nationalities,
}: {
    nationalities: { name: string; iso_code: string }[];
}): React.ReactElement {
    const [loading, setLoading] = React.useState<boolean>(true);

    const {
        authData,
        reloadAuthData,
    }: {
        authData: AuthenticationData;
        reloadAuthData: () => void;
    } = useAuthentication();

    const [selectedNationalities, setSelectedNationalities] = React.useState<
        string[]
    >([]);

    function updateNationalities() {
        if (selectedNationalities.length > 0) {
            saveNationalities(selectedNationalities).then((result: boolean) => {
                if (result) {
                    reloadAuthData();
                }
            });
        }
    }

    React.useEffect(() => {
        setSelectedNationalities(authData.person?.nationalities ?? []);
        setLoading(false);
    }, [authData]);

    if (loading || authData.person === null) {
        return <></>;
    }

    return (
        <>
            <Typography variant="h4">Nationalities</Typography>
            <Typography>
                To ensure the appropriate execution of export control
                procedures, we require your nationalities.
            </Typography>
            <Autocomplete
                value={selectedNationalities}
                onChange={(_e, newValues: string[]) =>
                    setSelectedNationalities(newValues)
                }
                options={nationalities
                    .sort((n1, n2) => n1.name.localeCompare(n2.name))
                    .map((n) => n.iso_code)}
                getOptionLabel={(option) =>
                    nationalities.filter((n) => n.iso_code === option)[0]
                        ?.name ?? ""
                }
                renderInput={(params) => (
                    <TextField {...params} label="Nationalities" />
                )}
                multiple
            />
            <Box>
                <Button
                    variant="contained"
                    sx={{ float: "right" }}
                    disabled={
                        selectedNationalities.length === 0 ||
                        selectedNationalities === authData.person.nationalities
                    }
                    onClick={updateNationalities}
                >
                    Save changes
                </Button>
            </Box>
        </>
    );
}
