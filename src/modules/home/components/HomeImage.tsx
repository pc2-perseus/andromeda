import { Box, Button, Card, CardActionArea, Typography } from "@mui/material";
import ThemedImage from "../../../components/ThemedImage.tsx";

export default function HomeImage() {
    return (
        <Card sx={{ width: "100%" }}>
            <CardActionArea>
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        overflow: "hidden",
                    }}
                >
                    <ThemedImage
                        src="/otus.jpg"
                        srcDark="/otus-dark.jpg"
                        style={{
                            width: "100%",
                            borderRadius: "4px",
                            objectFit: "cover",
                            display: "block",
                        }}
                    />

                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            height: "75%",
                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            p: 2,
                            boxSizing: "border-box",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                            }}
                        >
                            <Typography
                                variant="h1"
                                component="div"
                                sx={{
                                    color: "#fff",
                                    textAlign: "left",
                                }}
                            >
                                Otus.
                            </Typography>
                            <Typography
                                variant="h3"
                                component="div"
                                sx={{
                                    color: "#fff",
                                    textAlign: "left",
                                }}
                            >
                                Our new cluster at PC2, featuring Turin AMD EPYC
                                9655 CPUs and NVIDIA H100 GPUs.
                            </Typography>
                        </Box>
                        <Box sx={{ flexBasis: "auto" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ whiteSpace: "nowrap" }}
                                component="div"
                            >
                                Get access now
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    );
}
