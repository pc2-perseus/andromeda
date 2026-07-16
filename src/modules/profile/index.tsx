// React imports
import React from "react";
import { useSearchParams } from "react-router-dom";

// MUI imports
import { Alert, Box, Button, Divider, Typography } from "@mui/material";

// Custom imports
import Name from "./components/name";
import Affiliation from "./components/affiliation";
import Nationalities from "./components/nationalities";
import SSHKeys from "./components/SSHKeys/index.tsx";
import AccountLinking from "./components/accountLinking/index.tsx";
import ProfileSkeleton from "./components/ProfileSkeleton.tsx";
import useProfileOptionsQuery from "./hooks/useProfileOptionsQuery.ts";
import Email from "./components/email/index.tsx";
import useAuth from "../../hooks/useAuth.ts";

export default function Profile(): React.ReactElement {
    const [searchParams] = useSearchParams();
    const [section, setSection] = React.useState(
        searchParams.get("link_status") ? "linking" : "personal"
    );
    const auth = useAuth();
    const { data: options, isPending, isError } = useProfileOptionsQuery();

    if (isPending || auth.person === null) {
        return <ProfileSkeleton />;
    }

    if (isError) {
        return (
            <Alert severity="error">
                There was an error fetching profile options
            </Alert>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    py: 5,
                    width: "95vw",
                    maxWidth: "1400px",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 4,
                }}
            >
                <Box
                    sx={{
                        width: 250,
                        flexShrink: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: "center",
                            fontWeight: 600,
                            mb: 1,
                        }}
                    >
                        Settings
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                        }}
                    >
                        <Button
                            fullWidth
                            variant={
                                section === "personal" ? "contained" : "text"
                            }
                            onClick={() => setSection("personal")}
                            sx={{ justifyContent: "flex-start" }}
                        >
                            Personal Info
                        </Button>

                        <Button
                            fullWidth
                            variant={
                                section === "affiliation" ? "contained" : "text"
                            }
                            onClick={() => setSection("affiliation")}
                            sx={{ justifyContent: "flex-start" }}
                        >
                            Affiliation
                        </Button>

                        <Divider sx={{ my: 1 }} />

                        <Button
                            fullWidth
                            variant={section === "ssh" ? "contained" : "text"}
                            onClick={() => setSection("ssh")}
                            sx={{ justifyContent: "flex-start" }}
                        >
                            SSH Keys
                        </Button>

                        <Button
                            fullWidth
                            variant={
                                section === "linking" ? "contained" : "text"
                            }
                            onClick={() => setSection("linking")}
                            sx={{ justifyContent: "flex-start" }}
                        >
                            Account Linking
                        </Button>
                    </Box>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    {section === "personal" && (
                        <>
                            <Name />
                            <Divider />
                            <Email />
                            <Divider />
                            <Nationalities
                                nationalities={options.nationalities}
                            />
                        </>
                    )}

                    {section === "affiliation" && (
                        <Affiliation
                            organizations={options.organizations}
                            institutes={options.institutes}
                            nationalities={options.nationalities}
                        />
                    )}

                    {section === "ssh" && <SSHKeys />}

                    {section === "linking" && <AccountLinking />}
                </Box>
            </Box>
        </Box>
    );
}
