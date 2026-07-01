import { useTicketStore } from "../store/ticket.ts";

export default function useReset(): () => void {
    return useTicketStore((state) => state.reset);
}
