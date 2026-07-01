// React imports
import React from "react";

// MUI imports
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import useCurrentRole from "../../../hooks/useCurrentRole.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";
import type { Role } from "../../../../../types/perseus/Role.ts";

export default function Role(): React.ReactElement {
    const errors = useValidationErrors();
    const [currentRole, setCurrentRole] = useCurrentRole();

    return (
        <InfoInput infoText="<b>Principal Investigator</b>: Responsible for the project proposal and the compute project, usually requires a PhD<br /><br /><b>Person of Contact</b>: Member of the project, takes care of the technical aspects and will be used as contact person for the scientific and technical support">
            <FormControl error={"role" in errors} required fullWidth>
                <InputLabel>What is your role in this project?</InputLabel>
                <Select
                    label="What is your role in this project?"
                    value={currentRole ?? ""}
                    onChange={(e) => setCurrentRole(e.target.value ?? null)}
                >
                    <MenuItem value="PI">Principal Investigator</MenuItem>
                    <MenuItem value="PC">Person of Contact</MenuItem>
                    <MenuItem value="PI-PC">
                        Principal Investigator & Person of Contact
                    </MenuItem>
                </Select>
                {"role" in errors && (
                    <FormHelperText>{errors["role"]}</FormHelperText>
                )}
            </FormControl>
        </InfoInput>
    );
}
