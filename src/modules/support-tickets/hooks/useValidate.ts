import { useTicketStore } from "../store/ticket.ts";
import { useShallow } from "zustand/react/shallow";

export default function useValidate() {
    return useTicketStore(
        useShallow((state) => ({
            isValidating: state.isValidating,
            validate: state.validate,
            errors: state.validationErrors,
            setValidationError: state.setValidationError,
            clearValidationError: state.clearValidationError,
        }))
    );
}
