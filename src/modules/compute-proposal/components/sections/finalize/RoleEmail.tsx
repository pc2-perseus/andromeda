// React imports
import React from "react";

// MUI imports
import { TextField } from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import useCurrentRole from "../../../hooks/useCurrentRole.ts";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import usePersonOfContactEmail from "../../../hooks/usePersonOfContactEmail.ts";
import usePrincipalInvestigatorEmail from "../../../hooks/usePrincipalInvestigatorEmail.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";

export default function RoleEmail(): React.ReactElement | null {
    const config = useModuleConfig();
    const errors = useValidationErrors();

    const [currentRole] = useCurrentRole();
    const [pcEmail, setPcEmail] = usePersonOfContactEmail();
    const [piEmail, setPiEmail] = usePrincipalInvestigatorEmail();

    if (!config) {
        return null;
    }

    if (currentRole === "PI") {
        return (
            <InfoInput infoText={config.info_texts.pc_email}>
                <TextField
                    label="Person of contact email address"
                    value={pcEmail ?? ""}
                    error={"custom_fields.pc_email" in errors}
                    helperText={
                        errors["custom_fields.pc_email"] ??
                        "We will send an email to the person of contact so that they can accept their role"
                    }
                    onChange={(e) => setPcEmail(e.currentTarget.value)}
                    required
                    fullWidth
                />
            </InfoInput>
        );
    }

    if (currentRole === "PC") {
        return (
            <InfoInput infoText={config.info_texts.pi_email}>
                <TextField
                    label="Principal investigator email address"
                    value={piEmail ?? ""}
                    error={"custom_fields.pi_email" in errors}
                    helperText={
                        errors["custom_fields.pi_email"] ??
                        "We will send an email to the principal investigator so that they can approve the proposal"
                    }
                    onChange={(e) => setPiEmail(e.currentTarget.value)}
                    required
                    fullWidth
                />
            </InfoInput>
        );
    }

    return null;
}
