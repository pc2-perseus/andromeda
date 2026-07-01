// React imports
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

// MUI imports
import { Alert, AlertTitle, Box, CircularProgress } from "@mui/material";

// Custom imports
import claimPI from "../api/claimPI.ts";

export default function ClaimPI(): React.ReactElement {
    const { proposalId }: { proposalId?: string } = useParams();

    const [status, setStatus] = React.useState<"loading" | "error">("loading");
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    React.useEffect(() => {
        const token: string | null = searchParams.get("token");

        if (proposalId === undefined || token === null) {
            setStatus("error");
            return;
        }

        claimPI(proposalId, token).then((result: boolean) => {
            if (result) {
                navigate(`/compute-proposal/${proposalId}`);
            } else {
                setStatus("error");
            }
        });
    }, []);

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
