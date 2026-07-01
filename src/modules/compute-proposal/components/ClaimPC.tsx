// React imports
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

// MUI imports
import { Alert, AlertTitle, Box, CircularProgress } from "@mui/material";

// Custom imports
import claimPC from "../api/claimPC.ts";
import type { AuthenticationData } from "../../../types/AuthenticationData.ts";
import useAuthentication from "../../../contexts/authentication";

export default function ClaimPC(): React.ReactElement {
    const { authData }: { authData: AuthenticationData } = useAuthentication();
    const { proposalId }: { proposalId?: string } = useParams();

    const [status, setStatus] = React.useState<"loading" | "error" | "success">(
        "loading"
    );
    const [searchParams] = useSearchParams();

    React.useEffect(() => {
        const token: string | null = searchParams.get("token");

        if (proposalId === undefined || token === null) {
            setStatus("error");
            return;
        }

        claimPC(proposalId, token).then((result: boolean) => {
            setStatus(result ? "success" : "error");
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
            {status === "success" && (
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
                            Thank you {authData.person?.firstname}!
                        </AlertTitle>
                        You have been added as person of contact.
                    </Alert>
                </Box>
            )}
        </>
    );
}
