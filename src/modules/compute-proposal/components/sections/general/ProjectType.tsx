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
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import useProjectType from "../../../hooks/useType.ts";
import useValidationError from "../../../hooks/useValidationError.ts";

export default function ProjectType(): React.ReactElement | null {
    const config = useModuleConfig();
    const error = useValidationError("project_type");

    const [projectType, setProjectType] = useProjectType();

    if (!config) {
        return null;
    }

    return (
        <InfoInput infoText={config.info_texts.project_type}>
            <FormControl error={Boolean(error)} required fullWidth>
                <InputLabel>Project type</InputLabel>
                <Select
                    label="Project type"
                    value={projectType ?? ""}
                    onChange={(e) => setProjectType(e.target.value)}
                >
                    {config.project_types.map((item: string) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        </InfoInput>
    );
}
