import { useShallow } from "zustand/react/shallow";
import { useTicketStore } from "../store/ticket.ts";

export default function useServiceSelection() {
    return useTicketStore(
        useShallow((state) => ({
            value: state.selectedServiceOid,
            setValue: state.setSelectedServiceOid,
        }))
    );
}
