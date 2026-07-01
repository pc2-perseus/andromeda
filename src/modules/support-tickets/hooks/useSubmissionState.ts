import { useShallow } from "zustand/react/shallow";
import { useTicketStore } from "../store/ticket.ts";

export default function useSubmissionState() {
    return useTicketStore(
        useShallow((state) => ({
            value: state.submissionState,
            setValue: state.setSubmissionState,
        }))
    );
}
