import React from "react";
import { MenuItem, TextField } from "@mui/material";
import useServicesQuery from "../../../system-status/hooks/useServicesQuery.ts";
import useSystemStatusGroups from "../../../system-status/hooks/useSystemStatusGroups.ts";
import useServiceGroupSelection from "../../hooks/useServiceGroupSelection.ts";
import useServiceSelection from "../../hooks/useServiceSelection.ts";
import useServiceOptions from "../../hooks/useServiceOptions.ts";
import useIsSubmitting from "../../hooks/useIsSubmitting.ts";
import FormFieldSkeleton from "./FormFieldSkeleton.tsx";

export default function Service(): React.ReactElement {
    const {
        data: services = [],
        isPending: loading,
        isError,
    } = useServicesQuery();
    const serviceGroups = useSystemStatusGroups({
        entries: [],
        services,
    });
    const serviceOptions = useServiceOptions(serviceGroups);
    const { value: groupValue } = useServiceGroupSelection();
    const { value, setValue } = useServiceSelection();
    const isSubmitting = useIsSubmitting();

    if (loading) {
        return <FormFieldSkeleton />;
    }

    return (
        <TextField
            select
            fullWidth
            label="Service"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={
                isSubmitting ||
                isError ||
                groupValue === "" ||
                serviceOptions.length === 0
            }
            error={isError}
            helperText={
                isError
                    ? "Services could not be loaded."
                    : "Optional: select the specific service related to the issue."
            }
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
