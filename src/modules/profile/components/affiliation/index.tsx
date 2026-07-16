// React imports
import React from "react";

// MUI imports
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Grid,
    Typography,
} from "@mui/material";

// Custom imports
import type { Organization } from "../../../../types/perseus/Organization.ts";
import type { Institute } from "../../../../types/perseus/Institute.ts";
import type { Nationality } from "../../types/ProfileOptions.ts";
import CountrySelect from "./CountrySelect.tsx";
import StateSelect from "./StateSelect.tsx";
import OrganizationSelect from "./OrganizationSelect.tsx";
import InstituteSelect from "./InstituteSelect.tsx";
import useAuth from "../../../../hooks/useAuth.ts";
import useSaveAffiliationMutation from "../../hooks/useSaveAffiliationMutation.ts";

export default function Index({
    organizations,
    institutes,
    nationalities,
}: {
    organizations: Organization[];
    institutes: Institute[];
    nationalities: Nationality[];
}): React.ReactElement | null {
    const [loading, setLoading] = React.useState<boolean>(true);

    const auth = useAuth();
    const saveMutation = useSaveAffiliationMutation();

    const [state, setState] = React.useState<string | null>(null);
    const [country, setCountry] = React.useState<string>("DE");

    const [selectedAffiliation, setSelectedAffiliation] = React.useState<{
        organization: Organization | null;
        institute: Institute | null;
    }>({ organization: null, institute: null });

    function updateAffiliation() {
        if (
            selectedAffiliation.organization !== null &&
            selectedAffiliation.institute !== null &&
            selectedAffiliation.institute._id !== null &&
            selectedAffiliation.institute._id !== auth.person?.affiliation_oid
        ) {
            saveMutation.mutate(selectedAffiliation.institute._id);
        }
    }

    React.useEffect(() => {
        if (auth.person === null || auth.person.affiliation_oid === null) {
            setSelectedAffiliation({ organization: null, institute: null });
            setCountry("DE");
            setState(null);
        } else {
            const institute: Institute | null =
                institutes.filter(
                    (ins) => ins._id === auth.person?.affiliation_oid
                )[0] ?? null;
            let organization: Organization | null = null;
            if (institute !== null) {
                organization =
                    organizations.filter(
                        (org) => org._id === institute.organization_id
                    )[0] ?? null;
            }
            setSelectedAffiliation({
                organization: organization,
                institute: institute,
            });
            setCountry(organization?.location?.country ?? "DE");
            setState(organization?.location?.state ?? null);
        }
        setLoading(false);
    }, [auth, organizations, institutes]);

    if (loading || auth.person === null) {
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

    const isAffiliationComplete =
        country !== null &&
        state !== null &&
        selectedAffiliation.organization !== null &&
        selectedAffiliation.institute !== null;

    return (
        <>
            <Typography variant="h4">Affiliation</Typography>
            <Grid container spacing={2}>
                {saveMutation.isError && (
                    <Grid size={12}>
                        <Alert severity="error">
                            There was an error saving your affiliation.
                        </Alert>
                    </Grid>
                )}
                <Grid size={{ xs: 12, md: 6 }}>
                    <CountrySelect
                        selected={country}
                        onChange={(country) => {
                            setCountry(country);
                            setState(null);

                            setSelectedAffiliation({
                                organization: null,
                                institute: null,
                            });
                        }}
                        organizations={organizations}
                        nationalities={nationalities}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <StateSelect
                        country={country}
                        selected={state}
                        onChange={(newState) => {
                            setState(newState);

                            setSelectedAffiliation({
                                organization: null,
                                institute: null,
                            });
                        }}
                        organizations={organizations}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <OrganizationSelect
                        country={country}
                        state={state}
                        selected={selectedAffiliation.organization}
                        onChange={(newValue) =>
                            setSelectedAffiliation({
                                organization: newValue,
                                institute: null,
                            })
                        }
                        organizations={organizations}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <InstituteSelect
                        organization={selectedAffiliation.organization}
                        selected={selectedAffiliation.institute}
                        onChange={(newValue) =>
                            setSelectedAffiliation({
                                organization: selectedAffiliation.organization,
                                institute: newValue,
                            })
                        }
                        institutes={institutes}
                    />
                </Grid>
                <Grid size={12}>
                    <Button
                        variant="contained"
                        sx={{ float: "right" }}
                        disabled={
                            saveMutation.isPending ||
                            !isAffiliationComplete ||
                            (selectedAffiliation.institute?._id ?? null) ===
                                auth.person.affiliation_oid
                        }
                        onClick={updateAffiliation}
                    >
                        Save changes
                    </Button>
                </Grid>
                {selectedAffiliation.institute &&
                    selectedAffiliation.organization && (
                        <Grid size={12}>
                            <Typography>
                                <strong>Institute name:</strong>
                            </Typography>
                            <Typography>
                                {selectedAffiliation.institute.name}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <strong>Institute address:</strong>
                            </Typography>
                            <Typography>
                                {
                                    selectedAffiliation.organization.location
                                        ?.street
                                }
                            </Typography>
                            <Typography>
                                {
                                    selectedAffiliation.organization.location
                                        ?.postal_code
                                }{" "}
                                {
                                    selectedAffiliation.organization.location
                                        ?.city
                                }
                            </Typography>
                        </Grid>
                    )}
            </Grid>
        </>
    );
}
