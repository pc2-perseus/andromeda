import { useShallow } from "zustand/react/shallow";
import { useTicketStore } from "../store/ticket.ts";

export default function useAttachment() {
    return useTicketStore(
        useShallow((state) => ({
            attachment: state.attachment,
            setAttachment: state.setAttachment,
        }))
    );
}
