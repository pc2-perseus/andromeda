// React imports
import React from "react";

// MUI imports
import { TextField } from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import useProfessorship from "../../../hooks/useProfessorship.ts";

export default function Professorship(): React.ReactElement | null {
    const config = useModuleConfig();
    const [professorship, setProfessorship] = useProfessorship();

    if (!config) {
        return null;
    }

    return (
        <InfoInput infoText={config.info_texts.professorship}>
            <TextField
                label="Professorship this proposal belongs to"
                value={professorship ?? ""}
                onChange={(e) => setProfessorship(e.currentTarget.value)}
                fullWidth
            />
        </InfoInput>
    );
}
