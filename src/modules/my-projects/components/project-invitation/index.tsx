import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";

import useAuth from "../../../../hooks/useAuth.ts";
import useAcceptInviteMutation from "../../hooks/useAcceptInviteMutation.ts";

export default function ProjectInvitation(): React.ReactElement {
    const auth = useAuth();
    const {
        projectId,
        invitationId,
    }: { projectId?: string; invitationId?: string } = useParams();

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const { mutate, isSuccess, isError, isPending } = useAcceptInviteMutation(
        projectId ?? ""
    );
    const invitationDataMissing = !projectId || !token || !invitationId;

    function accept() {
        if (invitationDataMissing) {
            return;
        }
        if (isPending) {
            return;
        }

        mutate({ token, invitationId });
    }

    return (
        <Box
            sx={{
                width: "100vw",
                minHeight: "60vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
            }}
        >
            {isPending ? <CircularProgress /> : null}

            {invitationDataMissing ? (
                <Alert severity="error" variant="outlined">
                    <AlertTitle>Error</AlertTitle>
                    This invitation link is incomplete.
                </Alert>
            ) : null}

            {isError ? (
                <Alert severity="error" variant="outlined">
                    <AlertTitle>Error</AlertTitle>
                    This invitation link is incorrect, expired or has already
                    been used.
                </Alert>
            ) : null}

            {!invitationDataMissing && !isPending && !isError && !isSuccess ? (
                <Stack spacing={2}>
                    <Box>
                        <AlertTitle>Project invitation</AlertTitle>
                        <Typography>
                            Accept this invitation to join the compute project.
                        </Typography>
                    </Box>
                    <Box>
                        <Button variant="contained" onClick={accept}>
                            Accept invitation
                        </Button>
                    </Box>
                </Stack>
            ) : null}

            {isSuccess ? (
                <Alert severity="success" variant="outlined">
                    <Stack spacing={2}>
                        <Box>
                            <AlertTitle>
                                Thank you {auth.person?.firstname}!
                            </AlertTitle>
                            You have been added to the compute project.
                        </Box>
                    </Stack>
                </Alert>
            ) : null}
        </Box>
    );
}
