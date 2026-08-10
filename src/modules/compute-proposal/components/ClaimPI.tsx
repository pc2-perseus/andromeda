// React imports
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

// MUI imports
import { Alert, AlertTitle, Box, CircularProgress } from "@mui/material";

// Custom imports
import useClaimPIMutation from "../hooks/useClaimPIMutation.ts";

export default function ClaimPI(): React.ReactElement {
    const { proposalId }: { proposalId?: string } = useParams();
    const [searchParams] = useSearchParams();
    const token: string | null = searchParams.get("token");
    const isInvalidLink = proposalId === undefined || token === null;

    const [status, setStatus] = React.useState<"loading" | "error">("loading");
    const { mutate } = useClaimPIMutation();

    const navigate = useNavigate();

    React.useEffect(() => {
        if (isInvalidLink) {
            return;
        }

        mutate(
            { proposalId, token },
            {
                onSuccess: (result) => {
                    if (result) {
                        navigate(`/compute-proposal/${proposalId}`);
                    } else {
                        setStatus("error");
                    }
                },
                onError: () => setStatus("error"),
            }
        );
    }, [isInvalidLink, mutate, navigate, proposalId, token]);

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
        </>
    );
}
