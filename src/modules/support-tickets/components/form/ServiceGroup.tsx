import React from "react";
import { MenuItem, TextField } from "@mui/material";
import type { SystemStatusService } from "../../../../types/perseus/SystemStatusService.ts";
import useServiceGroupSelection from "../../hooks/useServiceGroupSelection.ts";
import useServiceSelection from "../../hooks/useServiceSelection.ts";
import useSubmitState from "../../hooks/useSubmitState.ts";

export default function ServiceGroup({
    serviceGroups,
}: {
    serviceGroups: {
        key: string;
        title: string;
        services: { service: SystemStatusService }[];
    }[];
}): React.ReactElement {
    const { value, setValue } = useServiceGroupSelection();
    const { setValue: setServiceValue } = useServiceSelection();
    const { isSubmitting } = useSubmitState();

    return (
        <TextField
            select
            fullWidth
            label="Cluster / Central Services"
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
                setServiceValue("");
            }}
            disabled={isSubmitting || serviceGroups.length === 0}
            helperText="Optional: narrow the service selection to one cluster or to central services."
        >
            <MenuItem value="">No specific group</MenuItem>
            {serviceGroups.map((group) => (
                <MenuItem key={group.key} value={group.key}>
                    {group.title}
                </MenuItem>
            ))}
        </TextField>
    );
}
