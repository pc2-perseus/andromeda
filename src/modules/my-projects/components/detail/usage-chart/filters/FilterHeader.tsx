import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

export default function FilterHeader({
    showFilters,
    toggleShowFilters,
    resetFilters,
}: {
    showFilters: boolean;
    toggleShowFilters: () => void;
    resetFilters: () => void;
}): React.ReactElement {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Typography variant="subtitle1" fontWeight={600}>
                Filters
            </Typography>
            <Stack direction="row" spacing={1}>
                <Button size="small" onClick={resetFilters}>
                    Reset filters
                </Button>
                <Button size="small" onClick={toggleShowFilters}>
                    {showFilters ? "Hide filters" : "Show filters"}
                </Button>
            </Stack>
        </Box>
    );
}
