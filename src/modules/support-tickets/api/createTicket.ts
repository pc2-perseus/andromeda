import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { AndromedaTicketPayload } from "../types/ticket.ts";

type CreateTicketResponse = {
    result: boolean;
    message_oid?: string | null;
};

export default async function createTicket(
    payload: AndromedaTicketPayload
): Promise<{ result: boolean; message_oid: string | null }> {
    const call = await makeAPICall<CreateTicketResponse>(
        HTTPMethod.POST,
        "/perseus/service/Andromeda/tickets/new",
        payload,
        true
    );

    if (call.statusCode !== 200 || call.value === null) {
        return { result: false, message_oid: null };
    }

    return {
        result: call.value.result,
        message_oid: call.value.message_oid ?? null,
    };
}
