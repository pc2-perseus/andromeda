import { useTicketStore } from "../store/ticket.ts";

export default function useValidationError(path: string): string | null {
    return useTicketStore((state) => state.validationErrors[path] ?? null);
}
