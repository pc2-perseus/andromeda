// React Query imports
import { useMutation } from "@tanstack/react-query";

// Custom imports
import createTicket from "../api/createTicket.ts";
import type { AndromedaTicketPayload } from "../types/ticket.ts";

export const submitMutationKey = ["support-tickets", "submit"];

export default function useSubmitMutation() {
    return useMutation<
        void,
        Error,
        {
            payload: AndromedaTicketPayload;
            attachment: File | null;
        }
    >({
        mutationKey: submitMutationKey,
        mutationFn: async ({ payload, attachment }) =>
            createTicket(payload, attachment),
    });
}
