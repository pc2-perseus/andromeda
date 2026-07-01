// React imports
import React from "react";

// MUI imports
import { TextField } from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import usePublicLinks from "../../../hooks/usePublicLinks.ts";
import isValidUrl from "../../../../../utils/isValidUrl.ts";

export default function Links(): React.ReactElement | null {
    const config = useModuleConfig();
    const [links, setPublicLinks] = usePublicLinks();

    if (!config) {
        return null;
    }

    const value = links ?? "";
    const lines = value
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
    const invalidLinks = lines.filter((l) => !isValidUrl(l));

    const hasError = invalidLinks.length > 0;

    return (
        <InfoInput infoText={config.info_texts.public_links}>
            <TextField
                label="Additional links"
                value={value}
                multiline
                rows={3}
                onChange={(e) => setPublicLinks(e.currentTarget.value)}
                fullWidth
                error={hasError}
                helperText={
                    hasError
                        ? `Invalid URL format: ${invalidLinks[0]}`
                        : "Please add one link per line"
                }
            />
        </InfoInput>
    );
}
