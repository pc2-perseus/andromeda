// React imports
import React from "react";

// MUI imports
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import useHasStorageRequirements from "../../../hooks/useHasStorageRequirements.ts";

export default function StorageRequirements(): React.ReactElement | null {
    const config = useModuleConfig();
    const [hasStorageRequirements, setHasStorageRequirements] =
        useHasStorageRequirements();

    if (!config) {
        return null;
    }

    return (
        <InfoInput infoText={config.info_texts.storage_requirements}>
            <FormControl fullWidth required>
                <InputLabel>Special storage requirements</InputLabel>
                <Select
                    label="Special storage requirements"
                    value={hasStorageRequirements ? "y" : "n"}
                    onChange={(e) =>
                        setHasStorageRequirements(e.target.value === "y")
                    }
                >
                    <MenuItem value="n">None</MenuItem>
                    <MenuItem value="y">
                        Special privacy / confidentiality requirements
                    </MenuItem>
                </Select>
            </FormControl>
        </InfoInput>
    );
}
