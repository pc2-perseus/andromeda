// React imports
import React from "react";

// MUI imports
import { TextField } from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import useSoftware from "../../../hooks/useSoftware.ts";

const MAX_LENGTH = 500;

export default function Software(): React.ReactElement | null {
    const config = useModuleConfig();
    const [software, setSoftware] = useSoftware();

    if (!config) {
        return null;
    }

    const value = software ?? "";
    const length = value.length;

    return (
        <InfoInput infoText={config.info_texts.software}>
            <TextField
                label={`Software you will use (max. ${MAX_LENGTH} characters)`}
                value={value}
                onChange={(e) => setSoftware(e.currentTarget.value)}
                fullWidth
                slotProps={{
                    htmlInput: {
                        maxLength: MAX_LENGTH,
                    },
                }}
                helperText={`${length}/${MAX_LENGTH} characters used`}
            />
        </InfoInput>
    );
}
