import React from "react";
import { MenuItem, TextField } from "@mui/material";
import useServicesQuery from "../../../system-status/hooks/useServicesQuery.ts";
import useSystemStatusGroups from "../../../system-status/hooks/useSystemStatusGroups.ts";
import useServiceGroupSelection from "../../hooks/useServiceGroupSelection.ts";
import useServiceSelection from "../../hooks/useServiceSelection.ts";
import useIsSubmitting from "../../hooks/useIsSubmitting.ts";
import FormFieldSkeleton from "./FormFieldSkeleton.tsx";

export default function ServiceGroup(): React.ReactElement {
    const {
        data: services = [],
        isPending: loading,
        isError,
    } = useServicesQuery();
    const serviceGroups = useSystemStatusGroups({
        entries: [],
        services,
    });
    const { value, setValue } = useServiceGroupSelection();
    const { setValue: setServiceValue } = useServiceSelection();
    const isSubmitting = useIsSubmitting();

    if (loading) {
        return <FormFieldSkeleton />;
    }

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
            error={isError}
            disabled={isSubmitting || isError || serviceGroups.length === 0}
            helperText={
                isError
                    ? "Service groups could not be loaded."
                    : "Optional: narrow the service selection to one cluster or to central services."
            }
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
