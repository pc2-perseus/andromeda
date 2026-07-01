import CONFIG from "../../../config.ts";

export default async function attach(
    messageOid: string,
    file: File
): Promise<boolean> {
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

    const responseText = await response.text();

    if (!response.ok || responseText.trim() === "") {
        return false;
    }

    try {
        const payload = JSON.parse(responseText) as { result?: boolean };
        return payload.result === true;
    } catch {
        return false;
    }
}
