// React imports
import React from "react";
import { useSearchParams } from "react-router-dom";

// MUI imports
import { Box, Divider, Button, Typography } from "@mui/material";

// Custom imports
import type { AuthenticationData } from "../../types/AuthenticationData.ts";
import useAuthentication from "../../contexts/authentication";
import getOptions from "./api/getOptions.ts";
import Name from "./components/name";
import Affiliation from "./components/affiliation";
import Nationalities from "./components/nationalities";
import SSHKeys from "./components/SSHKeys/index.tsx";
import AccountLinking from "./components/accountLinking/index.tsx";
import ProfileSkeleton from "./components/ProfileSkeleton.tsx";

import type { ProfileOptions } from "./types/ProfileOptions.ts";

export default function Profile(): React.ReactElement {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [section, setSection] = React.useState(
        searchParams.get("link_status") ? "linking" : "personal"
    );
    const {
        authData,
        loading: authLoading,
    }: {
        authData: AuthenticationData;
        loading: boolean;
    } = useAuthentication();
    const [options, setOptions] = React.useState<ProfileOptions>({
        organizations: [],
        institutes: [],
        nationalities: [],
    });

    React.useEffect(() => {
        getOptions()
            .then((data) => setOptions(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading || authLoading || authData.person === null) {
        return <ProfileSkeleton />;
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
