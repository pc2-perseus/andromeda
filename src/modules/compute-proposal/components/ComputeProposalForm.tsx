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
import getModuleConfig from "../../../fundamental/getModuleConfig.ts";
import ErrorMissingModuleConfig from "../../../fundamental/ErrorMissingModuleConfig.tsx";
import type { ModuleConfig } from "../../../types/ModuleConfig.ts";
import SecGeneral from "./sections/general";
import SecScientific from "./sections/scientific";
import SecPublic from "./sections/public";
import SecResources from "./sections/resources";
import SecFinalize from "./sections/finalize";
import { useProjectStore } from "../store/project.ts";
import useConfig from "../../../hooks/useConfig.ts";
import useResources from "../../../hooks/useResources.ts";
import useAuth from "../../../hooks/useAuth.ts";
import useComputeProposalQuery from "../hooks/useComputeProposalQuery.ts";
import useReset from "../hooks/useReset.ts";

export default function ComputeProposalForm(): React.ReactElement {
    const reset = useReset();
    const { proposalId }: { proposalId?: string } = useParams();
    const routeKey = proposalId ?? "new";
    const routeKeyRef = React.useRef<string | null>(null);
    const hydratedProposalIdRef = React.useRef<string | null>(null);
    const [hydratedProposalId, setHydratedProposalId] = React.useState<
        string | null
    >(null);

    React.useEffect(() => {
        if (routeKeyRef.current === routeKey) {
            return;
        }

        reset();
        routeKeyRef.current = routeKey;
        hydratedProposalIdRef.current = null;
        setHydratedProposalId(null);
    }, [reset, routeKey]);

    // Init store
    const config = useConfig();
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

    const { oid: personId } = useAuth();
    const setPersonId = useProjectStore((s) => s.setPersonId);
    React.useEffect(() => {
        setPersonId(personId);
    }, [personId, setPersonId]);

    const { clusters, resources } = useResources();
    const setClusters = useProjectStore((s) => s.setClusters);
    React.useEffect(() => {
        setClusters(clusters);
    }, [setClusters, clusters]);

    const setResources = useProjectStore((s) => s.setResources);
    React.useEffect(() => {
        setResources(resources);
    }, [setResources, resources]);

    // Load proposal
    const {
        data: loadedProposal,
        isPending: isProposalPending,
        isError: isProposalError,
    } = useComputeProposalQuery(proposalId);

    const setProject = useProjectStore((s) => s.setProject);
    React.useEffect(() => {
        if (
            proposalId === undefined ||
            loadedProposal === undefined ||
            loadedProposal === null ||
            hydratedProposalIdRef.current === proposalId
        ) {
            return;
        }

        setProject({
            ...loadedProposal,
            custom_fields: {
                ...loadedProposal.custom_fields,
                checkboxes: loadedProposal.custom_fields.checkboxes ?? {},
            },
        });
        hydratedProposalIdRef.current = proposalId;
        setHydratedProposalId(proposalId);
    }, [loadedProposal, proposalId, setProject]);

    if (moduleConfig === undefined) {
        return <ErrorMissingModuleConfig />;
    }

    if (
        isProposalError ||
        (proposalId !== undefined && loadedProposal === null)
    ) {
        return (
            <Alert severity="error">
                <AlertTitle>Could not load proposal</AlertTitle>
            </Alert>
        );
    }

    if (
        proposalId !== undefined &&
        (isProposalPending || hydratedProposalId !== proposalId)
    ) {
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
