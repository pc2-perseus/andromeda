// React imports
import React from "react";

// MUI imports
import { Box } from "@mui/material";

// Custom imports
import SaveButton from "./SaveButton.tsx";
import SubmitButton from "./SubmitButton.tsx";
import DeleteButton from "./DeleteButton.tsx";

export default function ActionButtons(): React.ReactElement {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
            }}
        >
            <DeleteButton />

            <Box sx={{ display: "flex", gap: 2 }}>
                <SaveButton />
                <SubmitButton />
            </Box>
        </Box>
    );
}
