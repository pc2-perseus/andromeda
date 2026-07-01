// React imports
import React from "react";

// MUI imports
import { Box, Checkbox, FormControlLabel } from "@mui/material";

// Custom imports
import parseMarkdown from "../../../../../utils/parseMarkdown.ts";
import useCheckboxes from "../../../hooks/useCheckboxes.ts";
import useCurrentRole from "../../../hooks/useCurrentRole.ts";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";

export default function RequiredCheckboxes(): React.ReactElement | null {
    const config = useModuleConfig();
    const errors = useValidationErrors();

    const [currentRole] = useCurrentRole();
    const [checkboxes, setCheckbox] = useCheckboxes();

    if (!config || (currentRole !== "PI" && currentRole !== "PI-PC")) {
        return null;
    }

    return (
        <>
            {config.required_checkboxes.map((checkbox) => (
                <FormControlLabel
                    key={checkbox.id}
                    required={checkbox.required}
                    control={
                        <Checkbox
                            checked={
                                checkbox.id in checkboxes &&
                                checkboxes[checkbox.id]
                            }
                            onChange={(e) =>
                                setCheckbox(
                                    checkbox.id,
                                    e.currentTarget.checked
                                )
                            }
                            sx={{
                                color:
                                    `custom_fields.checkboxes.${checkbox.id}` in
                                    errors
                                        ? "error.main"
                                        : undefined,
                            }}
                        />
                    }
                    label={
                        <Box
                            sx={{
                                display: "inline-block",
                                color:
                                    `custom_fields.checkboxes.${checkbox.id}` in
                                    errors
                                        ? "error.main"
                                        : undefined,
                            }}
                        >
                            {parseMarkdown(checkbox.label)}
                        </Box>
                    }
                />
            ))}
        </>
    );
}
