import { useShallow } from "zustand/react/shallow";
import { useTicketStore } from "../store/ticket.ts";

export default function useProjectSelection() {
    return useTicketStore(
        useShallow((state) => ({
            value: state.selectedProjectOid,
            setValue: state.setSelectedProjectOid,
        }))
    );
}
