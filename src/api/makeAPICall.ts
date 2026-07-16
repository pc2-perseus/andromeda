// Custom imports
import { HTTPMethod } from "./HTTPMethod.ts";
import CONFIG from "../config.ts";
import datesToISO from "../utils/datesToISO.ts";
import { APIError } from "./APIError.ts";

const abortControllers: Map<string, AbortController> = new Map<
    string,
    AbortController
>();

const relevantEndpoints: string[] = [];

/**
 * Makes an API call.
 *
 * @template T - Data type of the API response
 *
 * @param method {HTTPMethod} - The HTTP method to use
 * @param endpoint {string} - The endpoint to call
 * @param payload {undefined | object} - The payload to send with the request
 * @param bypassCache {boolean} - If the browser cache should be bypassed
 *
 * @throws APIError
 * @return {Promise<T>} - A promise containing the API response
 */
export default async function makeAPICall<T>(
    method: HTTPMethod,
    endpoint: string,
    payload: undefined | object = undefined,
    bypassCache: boolean = true
): Promise<T> {
    if (
        abortControllers.has(endpoint) &&
        relevantEndpoints.includes(endpoint)
    ) {
        abortControllers.get(endpoint)?.abort();
    }

    const controller = new AbortController();
    abortControllers.set(endpoint, controller);

    const call: globalThis.Response = await fetch(
        CONFIG.GATEWAY_URL + endpoint,
        {
            method: method.toString(),
            headers: new Headers({ "content-type": "application/json" }),
            body: payload ? JSON.stringify(datesToISO(payload)) : undefined,
            credentials: "include",
            cache: bypassCache ? "reload" : undefined,
            signal: controller.signal,
            keepalive: true,
        }
    );

    abortControllers.delete(endpoint);

    const responseText = await call.text();

    if (!call.ok) {
        throw new APIError(call.status, "API call failed");
    }

    if (!responseText.trim()) {
        throw new APIError(call.status, "Empty message from API");
    }

    return JSON.parse(responseText) as T;
}
