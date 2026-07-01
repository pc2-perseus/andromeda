// React imports
import React from "react";

// MUI imports
import { InputAdornment } from "@mui/material";

// Custom imports
import NumberField from "../../../../../components/NumberField.tsx";
import getItemName from "../../../functions/getItemName.ts";
import InfoInput from "../../../../../components/InfoInput.tsx";
import type { Resource } from "../../../../../types/perseus/Resource.ts";
import useRequestedResourceValue from "../../../hooks/useRequestedResourceValue.ts";
import useConfig from "../../../hooks/useModuleConfig.ts";
import useResourceUnit from "../../../hooks/useResourceUnit.ts";
import useResourceInfoText from "../../../hooks/useResourceInfoText.ts";
import useResourceRange from "../../../hooks/useResourceRange.ts";
import useRemainingResourceLimit from "../../../hooks/useRemainingResourceLimit.ts";

export default function Resource({
    resource,
}: {
    resource: Resource;
}): React.ReactElement | null {
    const config = useConfig();
    const [value, setValue] = useRequestedResourceValue(resource);
    const { unit, unitFactor } = useResourceUnit(resource);
    const infoText = useResourceInfoText(resource);
    const [min, max] = useResourceRange(resource);

    const remainingAmount = useRemainingResourceLimit(resource);
    const hasRemainingAmount = Boolean(remainingAmount);

    if (config === null) {
        return null;
    }

    const displayMin = Boolean(min && min !== value);
    const displayMax = Boolean(max && max !== value);

    let helperText: string | undefined;
    const isOutOfRange = Boolean((min && value < min) || (max && value > max));

    if (displayMin && displayMax) {
        helperText = `Enter value between ${(min as number) / unitFactor} ${unit} and ${(max as number) / unitFactor} ${unit}`;
    } else if (displayMin) {
        helperText = `Minimum required: ${(min as number) / unitFactor} ${unit}`;
    } else if (displayMax && hasRemainingAmount) {
        helperText = `Maximum allowed: ${(remainingAmount as number) / unitFactor} ${unit}`;
    } else if (displayMax) {
        helperText = `Maximum allowed: ${(max as number) / unitFactor} ${unit}`;
    }

    return (
        <InfoInput key={resource.id} infoText={infoText}>
            <NumberField
                label={getItemName(resource, config.alternative_names)}
                helperText={helperText}
                error={isOutOfRange}
                value={value / unitFactor}
                onChange={(value) => setValue(value * unitFactor)}
                slotProps={{
                    input: {
                        endAdornment:
                            unit === undefined ? undefined : (
                                <InputAdornment
                                    position="end"
                                    sx={{ marginRight: 2 }}
                                >
                                    {unit}
                                </InputAdornment>
                            ),
                    },
                }}
                fullWidth
            />
        </InfoInput>
    );
}
