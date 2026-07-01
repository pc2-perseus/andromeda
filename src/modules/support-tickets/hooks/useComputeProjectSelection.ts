import { useShallow } from "zustand/react/shallow";
import { useTicketStore } from "../store/ticket.ts";

export default function useComputeProjectSelection() {
    return useTicketStore(
        useShallow((state) => ({
            value: state.selectedComputeProjectId,
            setValue: state.setSelectedComputeProjectId,
        }))
    );
}
