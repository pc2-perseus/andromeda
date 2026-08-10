import React from "react";
import { Box } from "@mui/material";

export default function DataGridShell({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return (
        <Box
            sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                overflow: "hidden",
                "& .MuiDataGrid-cell": {
                    display: "flex",
                    alignItems: "center",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: 500,
                },
            }}
        >
            {children}
        </Box>
    );
}
