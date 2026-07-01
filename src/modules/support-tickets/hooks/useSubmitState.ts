import { useShallow } from "zustand/react/shallow";
import { useTicketStore } from "../store/ticket.ts";

export default function useSubmitState() {
    return useTicketStore(
        useShallow((state) => ({
            isSubmitting: state.isSubmitting,
            submit: state.submit,
            error: state.submitError,
        }))
    );
}
