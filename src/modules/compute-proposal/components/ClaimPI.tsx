// React imports
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

// MUI imports
import { Alert, AlertTitle, Box, CircularProgress } from "@mui/material";

// Custom imports
import useClaimPIMutation from "../hooks/useClaimPIMutation.ts";

export default function ClaimPI(): React.ReactElement {
    const { proposalId }: { proposalId?: string } = useParams();

    const [status, setStatus] = React.useState<"loading" | "error">("loading");
    const [searchParams] = useSearchParams();
    const { mutate } = useClaimPIMutation();

    const navigate = useNavigate();

    React.useEffect(() => {
        const token: string | null = searchParams.get("token");

        if (proposalId === undefined || token === null) {
            setStatus("error");
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
    }, [mutate, navigate, proposalId, searchParams]);

    return (
        <>
            {status === "loading" && (
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
            {status === "error" && (
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
