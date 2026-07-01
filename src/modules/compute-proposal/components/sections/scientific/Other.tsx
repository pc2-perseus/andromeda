// React imports
import React from "react";

// MUI imports
import { TextField } from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import useFundingItem from "../../../hooks/useFundingItem.ts";

export default function Other(): React.ReactElement | null {
    const config = useModuleConfig();
    const [item, setItem] = useFundingItem("other");

    if (!config) {
        return null;
    }

    return (
        <InfoInput infoText={config.info_texts.funding}>
            <TextField
                label="Further information on funding"
                value={item ?? ""}
                onChange={(e) => setItem(e.currentTarget.value)}
                multiline
                rows={3}
                fullWidth
            />
        </InfoInput>
    );
}
