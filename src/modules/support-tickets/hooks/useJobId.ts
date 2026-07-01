import { useShallow } from "zustand/react/shallow";
import { useTicketStore } from "../store/ticket.ts";

export default function useJobId() {
    return useTicketStore(
        useShallow((state) => ({
            value: state.jobIdInput,
            setValue: state.setJobIdInput,
        }))
    );
}
