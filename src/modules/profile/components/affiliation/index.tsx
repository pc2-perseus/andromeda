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

type AffiliationDraft = {
    country: string;
    state: string | null;
    organization: Organization | null;
    institute: Institute | null;
};

export default function Index({
    organizations,
    institutes,
    nationalities,
}: {
    organizations: Organization[];
    institutes: Institute[];
    nationalities: Nationality[];
}): React.ReactElement | null {
    const auth = useAuth();
    const me = auth.person;

    const saveMutation = useSaveAffiliationMutation();

    const savedInstitute: Institute | null =
        me?.affiliation_oid === null || me?.affiliation_oid === undefined
            ? null
            : (institutes.find((ins) => ins._id === me.affiliation_oid) ??
              null);

    const savedOrganization: Organization | null =
        savedInstitute === null
            ? null
            : (organizations.find(
                  (org) => org._id === savedInstitute.organization_id
              ) ?? null);

    const savedDraft: AffiliationDraft = {
        country: savedOrganization?.location?.country ?? "DE",
        state: savedOrganization?.location?.state ?? null,
        organization: savedOrganization,
        institute: savedInstitute,
    };

    const [draft, setDraft] = React.useState<AffiliationDraft | null>(null);

    const selectedAffiliation = draft ?? savedDraft;
    const { country, state, organization, institute } = selectedAffiliation;

    function handleCountryChange(country: string) {
        setDraft({
            country,
            state: null,
            organization: null,
            institute: null,
        });
    }

    function handleStateChange(state: string | null) {
        setDraft({
            country,
            state,
            organization: null,
            institute: null,
        });
    }

    function handleOrganizationChange(organization: Organization | null) {
        setDraft({
            country,
            state,
            organization,
            institute: null,
        });
    }

    function handleInstituteChange(institute: Institute | null) {
        setDraft({
            country,
            state,
            organization,
            institute,
        });
    }

    function updateAffiliation() {
        if (
            organization !== null &&
            institute !== null &&
            institute._id !== null &&
            institute._id !== me?.affiliation_oid
        ) {
            void saveMutation.mutateAsync(institute._id).then(() => {
                setDraft(null);
            });
        }
    }

    if (me === null) {
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
        state !== null && organization !== null && institute !== null;

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
                        onChange={handleCountryChange}
                        organizations={organizations}
                        nationalities={nationalities}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <StateSelect
                        country={country}
                        selected={state}
                        onChange={handleStateChange}
                        organizations={organizations}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <OrganizationSelect
                        country={country}
                        state={state}
                        selected={organization}
                        onChange={handleOrganizationChange}
                        organizations={organizations}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <InstituteSelect
                        organization={organization}
                        selected={institute}
                        onChange={handleInstituteChange}
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
                            (institute?._id ?? null) === me?.affiliation_oid
                        }
                        onClick={updateAffiliation}
                    >
                        Save changes
                    </Button>
                </Grid>
                {institute && organization && (
                    <Grid size={12}>
                        <Typography>
                            <strong>Institute name:</strong>
                        </Typography>
                        <Typography>{institute.name}</Typography>
                        <Typography sx={{ mt: 1 }}>
                            <strong>Institute address:</strong>
                        </Typography>
                        <Typography>{organization.location?.street}</Typography>
                        <Typography>
                            {organization.location?.postal_code}{" "}
                            {organization.location?.city}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </>
    );
}
