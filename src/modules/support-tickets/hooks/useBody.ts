import { useShallow } from "zustand/react/shallow";
import { useTicketStore } from "../store/ticket.ts";

export default function useBody() {
    return useTicketStore(
        useShallow((state) => ({
            value: state.body,
            setValue: state.setBody,
        }))
    );
}
