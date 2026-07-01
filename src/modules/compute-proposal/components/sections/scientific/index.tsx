// React imports
import React from "react";

// MUI imports
import { Typography } from "@mui/material";

// Custom imports
import Description from "./Description.tsx";
import FundingTable from "./FundingTable.tsx";
import Software from "./Software.tsx";
import ScientificFields from "./ScientificFields.tsx";
import Other from "./Other.tsx";

export default function SecScientific(): React.ReactElement | null {
    return (
        <>
            <Typography variant="h2">Scientific information</Typography>
            <Description />
            <ScientificFields />
            <Software />
            <FundingTable />
            <Other />
        </>
    );
}
