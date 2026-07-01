// React imports
import React from "react";

// MUI imports
import { DatePicker } from "@mui/x-date-pickers";
import type { DateValidationError } from "@mui/x-date-pickers/models";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import useStart from "../../../hooks/useStart.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";

// Other imports
import dayjs from "dayjs";

const mapStartDateInputError = (
    error: DateValidationError | null,
    minimumLeadDays: number
): string | null => {
    if (error === null) {
        return null;
    }

    if (error === "minDate") {
        if (minimumLeadDays > 0) {
            return `Please choose a start day at least ${minimumLeadDays} days from now`;
        }

        return "Dates in the past are not allowed";
    }

    if (error === "maxDate") {
        return "Dates more than 1 year in the future are not allowed";
    }

    if (error === "invalidDate") {
        return "Please enter a valid date";
    }

    return "Please enter a valid start date";
};

export default function StartDate(): React.ReactElement | null {
    const config = useModuleConfig();
    const errors = useValidationErrors();
    const [inputError, setInputError] = React.useState<string | null>(null);

    const [start, setStart] = useStart();

    if (!config) {
        return null;
    }

    return (
        <InfoInput infoText={config.info_texts.start}>
            <DatePicker
                label="Start (UTC)"
                timezone="UTC"
                value={start === null ? null : dayjs.utc(start)}
                minDate={dayjs.utc().add(config.minimum_lead_days, "day")}
                maxDate={dayjs.utc().add(1, "year")}
                onChange={(value) => {
                    setStart(value?.toDate() ?? null);
                }}
                onError={(error) => {
                    setInputError(
                        mapStartDateInputError(error, config.minimum_lead_days)
                    );
                }}
                slotProps={{
                    textField: {
                        required: true,
                        fullWidth: true,
                        error:
                            inputError !== null ||
                            (errors && "start" in errors),
                        helperText: inputError ?? errors["start"] ?? undefined,
                    },
                }}
            />
        </InfoInput>
    );
}
