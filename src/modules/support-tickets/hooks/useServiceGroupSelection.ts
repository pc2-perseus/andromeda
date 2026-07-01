import { useShallow } from "zustand/react/shallow";
import { useTicketStore } from "../store/ticket.ts";

export default function useServiceGroupSelection() {
    return useTicketStore(
        useShallow((state) => ({
            value: state.selectedServiceGroupKey,
            setValue: state.setSelectedServiceGroupKey,
        }))
    );
}
