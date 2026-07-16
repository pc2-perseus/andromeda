import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { AndromedaTicketPayload } from "../types/ticket.ts";
import CONFIG from "../../../config.ts";
import { APIError } from "../../../api/APIError.ts";

async function attach(messageOid: string, file: File): Promise<void> {
    const form = new FormData();
    form.append("file", file);

    const response = await fetch(
        `${CONFIG.GATEWAY_URL}/perseus/service/Andromeda/tickets/message/${messageOid}/attachment`,
        {
            method: "POST",
            body: form,
            credentials: "include",
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new APIError(
            response.status,
            "The ticket was created, but the attachment could not be uploaded."
        );
    }
}

export default async function createTicket(
    payload: AndromedaTicketPayload,
    attachment: File | null
): Promise<void> {
    const response = await makeAPICall<{
        result: boolean;
        message_oid?: string | null;
    }>(
        HTTPMethod.POST,
        "/perseus/service/Andromeda/tickets/new",
        payload,
        true
    );

    if (!attachment) {
        return;
    }

    const messageOid = response.message_oid;
    if (!messageOid) {
        throw new Error(
            "The attachment could not be uploaded because no Ticket ID was returned by the server"
        );
    }

    await attach(messageOid, attachment);
}
