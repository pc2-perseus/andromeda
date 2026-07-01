// React imports
import React from "react";
import { useParams } from "react-router-dom";

// MUI imports
import {
    Alert,
    AlertTitle,
    Box,
    CircularProgress,
    Container,
    Stack,
    Typography,
} from "@mui/material";

// Custom imports
import useConfig from "../../../contexts/configuration";
import type { GlobalConfiguration } from "../../../types/GlobalConfiguration.ts";
import getModuleConfig from "../../../fundamental/getModuleConfig.ts";
import ErrorMissingModuleConfig from "../../../fundamental/ErrorMissingModuleConfig.tsx";
import type { ModuleConfig } from "../../../types/ModuleConfig.ts";
import SecGeneral from "./sections/general";
import SecScientific from "./sections/scientific";
import SecPublic from "./sections/public";
import SecResources from "./sections/resources";
import SecFinalize from "./sections/finalize";
import useLoading from "../hooks/useLoading.ts";
import { useProjectStore } from "../store/project.ts";
import useAuthentication from "../../../contexts/authentication";
import useResources from "../../../contexts/resources";

export default function ComputeProposalForm(): React.ReactElement {
    const { isLoading, error, load } = useLoading();

    // Init store
    const { config }: { config: GlobalConfiguration } = useConfig();
    const moduleConfig: ModuleConfig | undefined = getModuleConfig(
        config,
        "compute-proposal"
    ) as ModuleConfig | undefined;
    const setConfig = useProjectStore((s) => s.setConfig);
    React.useEffect(() => {
        if (!moduleConfig) {
            return;
        }

        setConfig(moduleConfig);
    }, [moduleConfig, setConfig]);

    const {
        authData: { oid: personId },
    } = useAuthentication();
    const setPersonId = useProjectStore((s) => s.setPersonId);
    React.useEffect(() => {
        setPersonId(personId);
    }, [personId, setPersonId]);

    const {
        resourceData: { clusters, resources },
    } = useResources();
    const setClusters = useProjectStore((s) => s.setClusters);
    React.useEffect(() => {
        setClusters(clusters);
    }, [setClusters, clusters]);

    const setResources = useProjectStore((s) => s.setResources);
    React.useEffect(() => {
        setResources(resources);
    }, [setResources, resources]);

    // Load proposal
    const { proposalId }: { proposalId?: string } = useParams();
    React.useEffect(() => {
        if (proposalId === undefined) {
            return;
        }

        load(proposalId).then(() => {});
    }, [load, proposalId]);

    if (moduleConfig === undefined) {
        return <ErrorMissingModuleConfig />;
    }

    if (isLoading) {
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

    if (error) {
        return (
            <Alert severity="error">
                <AlertTitle>Could not load proposal</AlertTitle>
            </Alert>
        );
    }

    return (
        <Container>
            <Stack sx={{ py: 5 }} spacing={3}>
                <Typography sx={{ mb: 3 }}>
                    Please note that we save your compute project when you made
                    changes, so feel free to stop working on your proposal and
                    continue when you would like to do so.
                </Typography>
                <SecGeneral />
                <Box sx={{ my: 3 }} />
                <SecScientific />
                <Box sx={{ my: 3 }} />
                <SecResources />
                <Box sx={{ my: 3 }} />
                <SecPublic />
                <Box sx={{ my: 3 }} />
                <SecFinalize />
            </Stack>
        </Container>
    );
}
