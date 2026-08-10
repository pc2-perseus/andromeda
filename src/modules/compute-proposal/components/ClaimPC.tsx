// React imports
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

// MUI imports
import { Alert, AlertTitle, Box, CircularProgress } from "@mui/material";

// Custom imports
import useAuth from "../../../hooks/useAuth.ts";
import useClaimPCMutation from "../hooks/useClaimPCMutation.ts";

export default function ClaimPC(): React.ReactElement {
    const auth = useAuth();
    const { proposalId }: { proposalId?: string } = useParams();
    const [searchParams] = useSearchParams();
    const token: string | null = searchParams.get("token");
    const isInvalidLink = proposalId === undefined || token === null;

    const [status, setStatus] = React.useState<"loading" | "error" | "success">(
        "loading"
    );
    const { mutate } = useClaimPCMutation();

    React.useEffect(() => {
        if (isInvalidLink) {
            return;
        }

        mutate(
            { proposalId, token },
            {
                onSuccess: (result) => setStatus(result ? "success" : "error"),
                onError: () => setStatus("error"),
            }
        );
    }, [isInvalidLink, mutate, proposalId, token]);

    const visibleStatus = isInvalidLink ? "error" : status;

    return (
        <>
            {visibleStatus === "loading" && (
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
            )}
            {visibleStatus === "error" && (
                <Box
                    sx={{
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Alert severity="error" variant="outlined">
                        <AlertTitle>Error</AlertTitle>
                        This link is incorrect, expired or has already been
                        used.
                    </Alert>
                </Box>
            )}
            {visibleStatus === "success" && (
                <Box
                    sx={{
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Alert severity="success" variant="outlined">
                        <AlertTitle>
                            Thank you {auth.person?.firstname}!
                        </AlertTitle>
                        You have been added as person of contact.
                    </Alert>
                </Box>
            )}
        </>
    );
}
