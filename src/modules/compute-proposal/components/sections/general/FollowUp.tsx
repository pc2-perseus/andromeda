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
import useIsFollowUp from "../../../hooks/useIsFollowUp.ts";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";

export default function FollowUp(): React.ReactElement | null {
    const config = useModuleConfig();
    const errors = useValidationErrors();

    const [isFollowUp, setIsFollowUp] = useIsFollowUp();

    if (!config) {
        return null;
    }

    return (
        <InfoInput infoText={config.info_texts.is_followup}>
            <FormControl
                error={"source.is_followup" in errors}
                required
                fullWidth
            >
                <InputLabel>
                    Is this proposal for a new or a follow-up project?
                </InputLabel>
                <Select
                    label="Is this proposal for a new or a follow-up project?"
                    value={isFollowUp ? "follow-up" : "new"}
                    onChange={(e) =>
                        setIsFollowUp(e.target.value === "follow-up")
                    }
                >
                    <MenuItem value="new">New project</MenuItem>
                    <MenuItem value="follow-up">Follow-up project</MenuItem>
                </Select>
                {"source.is_followup" in errors && (
                    <FormHelperText>
                        {errors["source.is_followup"]}
                    </FormHelperText>
                )}
            </FormControl>
        </InfoInput>
    );
}
