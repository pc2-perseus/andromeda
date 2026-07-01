// React imports
import React from "react";

// MUI imports
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Custom imports
import { ResourceProvider } from "../../../contexts/resources/ResourceProvider.tsx";
import ComputeProposalForm from "./ComputeProposalForm.tsx";

// Other imports
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/de";
import useReset from "../hooks/useReset.ts";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ComputeProposal(): React.ReactElement {
    const reset = useReset();

    React.useEffect(() => {
        reset();
    }, [reset]);

    return (
        <ResourceProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                <ComputeProposalForm />
            </LocalizationProvider>
        </ResourceProvider>
    );
}
