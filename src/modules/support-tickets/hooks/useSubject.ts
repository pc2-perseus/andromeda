import { useShallow } from "zustand/react/shallow";
import { useTicketStore } from "../store/ticket.ts";

export default function useSubject() {
    return useTicketStore(
        useShallow((state) => ({
            value: state.subject,
            setValue: state.setSubject,
        }))
    );
}
