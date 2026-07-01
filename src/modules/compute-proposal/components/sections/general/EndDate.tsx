// React imports
import React from "react";

// MUI imports
import { DatePicker } from "@mui/x-date-pickers";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import useEnd from "../../../hooks/useEnd.ts";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import useProjectType from "../../../hooks/useType.ts";
import useStart from "../../../hooks/useStart.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";

// Other imports
import dayjs from "dayjs";

export default function EndDate(): React.ReactElement | null {
    const config = useModuleConfig();
    const errors = useValidationErrors();

    const [projectType] = useProjectType();
    const [start] = useStart();
    const [end, setEnd] = useEnd();

    if (!config) {
        return null;
    }

    return (
        <InfoInput infoText={config.info_texts.end}>
            <DatePicker
                label="End (UTC)"
                timezone="UTC"
                readOnly={Object.keys(config.fixed_length).includes(
                    projectType ?? ""
                )}
                slotProps={{
                    textField: {
                        required: true,
                        fullWidth: true,
                        error: "end" in errors,
                        helperText:
                            errors["end"] ??
                            (Object.keys(config.fixed_length).includes(
                                projectType ?? ""
                            )
                                ? `Projects of type "${projectType}" have a fixed length`
                                : undefined),
                    },
                }}
                value={end === null ? null : dayjs.utc(end)}
                minDate={
                    start === null
                        ? dayjs.utc().add(config.minimum_lead_days + 1, "day")
                        : dayjs.utc(start).add(1, "day")
                }
                onAccept={(value) => {
                    setEnd(value?.toDate() ?? null);
                }}
            />
        </InfoInput>
    );
}
