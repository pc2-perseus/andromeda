// React imports
import React from "react";
import { useNavigate } from "react-router-dom";

// MUI imports
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Stack,
    Typography,
} from "@mui/material";

// Icon imports
import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Custom imports
import List from "./components/list";

export default function ComputeProposalList(): React.ReactElement {
    const navigate = useNavigate();

    return (
        <Container>
            <Stack sx={{ py: 2 }} spacing={3}>
                <Box sx={{ flexGrow: 1, pb: 2 }}>
                    <Box sx={{ px: 2, mt: 2, mb: 3 }}>
                        <Typography variant="h2" component="h1">
                            My compute proposals
                        </Typography>
                        <Typography color="text.secondary">
                            Create and manage compute proposal requests.
                        </Typography>
                    </Box>
                    <Box sx={{ px: 2 }}>
                        <Card variant="outlined" sx={{ mb: 3 }}>
                            <CardActionArea
                                onClick={() =>
                                    navigate("/compute-proposal/new")
                                }
                            >
                                <CardContent sx={{ p: 0 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                writingMode: "vertical-lr",
                                                transform: "scale(-1, -1)",
                                                textAlign: "center",
                                                fontSize: "19px",
                                                px: 1,
                                                backgroundColor: "primary.main",
                                                color: "white",
                                            }}
                                        >
                                            <AddIcon />
                                        </Box>
                                        <Box
                                            sx={{
                                                py: 1,
                                                ml: 1,
                                                flexGrow: 2,
                                            }}
                                        >
                                            <Typography
                                                sx={{ fontSize: 14 }}
                                                color="text.secondary"
                                                gutterBottom
                                            >
                                                Easy like never before!
                                            </Typography>
                                            <Typography
                                                variant="h5"
                                                component="div"
                                            >
                                                Create a new compute proposal
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                pr: "6px",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <ChevronRightIcon />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <List />
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
}
