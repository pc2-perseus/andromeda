import React from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import { blue } from "@mui/material/colors";

export default function SelfServices(): React.ReactElement {
    return (
        <Card
            variant="outlined"
            sx={{
                borderStyle: "dashed",
                borderColor: "divider",
                background: blue["50"],
            }}
        >
            <CardContent sx={{ py: 5 }}>
                <Stack spacing={2} alignItems="center" textAlign="center">
                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                        }}
                    >
                        <ConstructionOutlinedIcon />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Self services are coming soon
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}
