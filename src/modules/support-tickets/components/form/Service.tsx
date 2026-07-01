import React from "react";
import { MenuItem, TextField } from "@mui/material";
import type { SystemStatusService } from "../../../../types/perseus/SystemStatusService.ts";
import useServiceGroupSelection from "../../hooks/useServiceGroupSelection.ts";
import useServiceSelection from "../../hooks/useServiceSelection.ts";
import useSubmitState from "../../hooks/useSubmitState.ts";

export default function Service({
    serviceOptions,
}: {
    serviceOptions: SystemStatusService[];
}): React.ReactElement {
    const { value: groupValue } = useServiceGroupSelection();
    const { value, setValue } = useServiceSelection();
    const { isSubmitting } = useSubmitState();

    return (
        <TextField
            select
            fullWidth
            label="Service"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={
                isSubmitting || groupValue === "" || serviceOptions.length === 0
            }
            helperText="Optional: select the specific service related to the issue."
        >
            <MenuItem value="">No specific service</MenuItem>
            {serviceOptions.map((service) => (
                <MenuItem key={service._id} value={service._id ?? ""}>
                    {service.name}
                </MenuItem>
            ))}
        </TextField>
    );
}
