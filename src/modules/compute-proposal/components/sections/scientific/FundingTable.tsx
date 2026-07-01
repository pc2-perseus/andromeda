// React imports
import React from "react";

// MUI imports
import { Table, TableBody, TableHead, Typography } from "@mui/material";

// Custom imports
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import FundingRow from "./FundingRow.tsx";

export default function FundingTable(): React.ReactElement | null {
    const config = useModuleConfig();

    if (!config) {
        return null;
    }

    return (
        <>
            <Typography>
                Please check all organisations which fund the research you will
                do in this project:
            </Typography>
            <Table>
                <TableHead />
                <TableBody>
                    {config.selectable_funding.map((item, index) => (
                        <FundingRow key={index} item={item} />
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
