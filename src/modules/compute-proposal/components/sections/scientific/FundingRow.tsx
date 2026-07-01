// React imports
import React from "react";

// MUI imports
import {
    Checkbox,
    CircularProgress,
    FormControlLabel,
    InputAdornment,
    TableCell,
    TableRow,
    TextField,
} from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import useCheckFundingIdentifier from "../../../hooks/useCheckFundingIdentifier.ts";
import type { FundingItem } from "../../../types/FundingItem.ts";

export default function FundingRow({
    item,
}: {
    item: FundingItem;
}): React.ReactElement | null {
    const {
        fundingIdentifier,
        fundingInstitution,
        checkingIdentifier,
        checked,
        setChecked,
        setFundingInstitution,
        setFundingIdentifier,
        identifierCheckResult,
    } = useCheckFundingIdentifier(item);

    return (
        <>
            <TableRow sx={{ px: 0, display: { xs: "none", md: "table-row" } }}>
                <TableCell sx={{ border: "none", pl: 0 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(e) => {
                                    setChecked(e.currentTarget.checked);
                                }}
                            />
                        }
                        label={item.name}
                    />
                </TableCell>
                {item.add_institution && (
                    <TableCell sx={{ border: "none" }}>
                        <TextField
                            label="Funding institution"
                            required={checked}
                            disabled={!checked}
                            value={fundingInstitution}
                            onChange={(e) =>
                                setFundingInstitution(e.currentTarget.value)
                            }
                            fullWidth
                        />
                    </TableCell>
                )}
                <TableCell
                    sx={{ border: "none", pr: 0 }}
                    colSpan={item.add_institution ? undefined : 2}
                >
                    <InfoInput infoText={item.info_text}>
                        <TextField
                            label="Project identifier"
                            required={checked}
                            disabled={!checked}
                            error={identifierCheckResult === false}
                            color={
                                identifierCheckResult === true
                                    ? "success"
                                    : undefined
                            }
                            focused={identifierCheckResult === true}
                            helperText={
                                identifierCheckResult === false
                                    ? `${fundingIdentifier} is not a valid identifier`
                                    : undefined
                            }
                            sx={{
                                "& .MuiInputBase-root": {
                                    position: "relative",
                                },
                                "& .MuiInputAdornment-root.progressAdornment": {
                                    position: "absolute",
                                    right: 8,
                                    pointerEvents: "none",
                                },
                            }}
                            slotProps={{
                                input: {
                                    startAdornment:
                                        item.identifier_link_prefix ? (
                                            <InputAdornment position="start">
                                                {item.identifier_link_prefix}
                                            </InputAdornment>
                                        ) : undefined,
                                    endAdornment: checkingIdentifier ? (
                                        <InputAdornment
                                            position="end"
                                            className="progressAdornment"
                                        >
                                            <CircularProgress />
                                        </InputAdornment>
                                    ) : undefined,
                                },
                            }}
                            value={fundingIdentifier}
                            onChange={(e) =>
                                setFundingIdentifier(e.currentTarget.value)
                            }
                            fullWidth
                        />
                    </InfoInput>
                </TableCell>
            </TableRow>
            <TableRow sx={{ px: 0, display: { md: "none" } }}>
                <TableCell sx={{ border: "none", px: 0, pb: 0 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(e) => {
                                    setChecked(e.currentTarget.checked);
                                }}
                            />
                        }
                        label={item.name}
                    />
                </TableCell>
            </TableRow>
            {item.add_institution && (
                <TableRow sx={{ px: 0, display: { md: "none" } }}>
                    <TableCell sx={{ px: 0, pb: 0, border: "none" }}>
                        <TextField
                            label="Funding institution"
                            required={checked}
                            disabled={!checked}
                            value={fundingInstitution}
                            onChange={(e) =>
                                setFundingInstitution(e.currentTarget.value)
                            }
                            fullWidth
                        />
                    </TableCell>
                </TableRow>
            )}
            <TableRow sx={{ px: 0, display: { md: "none" } }}>
                <TableCell
                    sx={{ border: "none", px: 0 }}
                    colSpan={item.add_institution ? undefined : 2}
                >
                    <InfoInput infoText={item.info_text}>
                        <TextField
                            label="Project identifier"
                            required={checked}
                            disabled={!checked}
                            error={identifierCheckResult === false}
                            color={
                                identifierCheckResult === true
                                    ? "success"
                                    : undefined
                            }
                            focused={identifierCheckResult === true}
                            helperText={
                                identifierCheckResult === false
                                    ? `${fundingIdentifier} is not a valid identifier`
                                    : item.identifier_link_prefix
                                      ? `${item.identifier_link_prefix}<ID>`
                                      : undefined
                            }
                            sx={{
                                "& .MuiInputBase-root": {
                                    position: "relative",
                                },
                                "& .MuiInputAdornment-root.progressAdornment": {
                                    position: "absolute",
                                    right: 8,
                                    pointerEvents: "none",
                                },
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: checkingIdentifier ? (
                                        <InputAdornment
                                            position="end"
                                            className="progressAdornment"
                                        >
                                            <CircularProgress />
                                        </InputAdornment>
                                    ) : undefined,
                                },
                            }}
                            value={fundingIdentifier}
                            onChange={(e) =>
                                setFundingIdentifier(e.currentTarget.value)
                            }
                            fullWidth
                        />
                    </InfoInput>
                </TableCell>
            </TableRow>
        </>
    );
}
