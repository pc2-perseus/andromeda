type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Sets a value deeply in a nested object structure by traversing the given path.
 *
 * @param {UnknownRecord} root - The object to update.
 * @param {string} path - A dot-separated path specifying where to place the value.
 * @param {unknown} value - The value to set in the specified path.
 */
export function setDeep(
    root: UnknownRecord,
    path: string,
    value: unknown
): void {
    const keys = path.split(".").filter(Boolean);
    if (keys.length === 0) return;

    let cur: UnknownRecord = root;

    for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i]!;
        const next = cur[k];

        if (!isRecord(next)) {
            cur[k] = {};
        }

        const ensured = cur[k];
        if (!isRecord(ensured)) {
            // fallback, this shouldn't happen
            cur[k] = {};
        }

        cur = cur[k] as UnknownRecord;
    }

    cur[keys[keys.length - 1]!] = value;
}

/**
 * Removes a value deeply from a nested object structure by traversing the given path.
 * Empty parent objects are removed as well.
 *
 * @param {UnknownRecord} root - The object to update.
 * @param {string} path - A dot-separated path specifying which value to remove.
 */
export function removeDeep(root: UnknownRecord, path: string): void {
    const keys = path.split(".").filter(Boolean);
    if (keys.length === 0) return;

    const chain: { parent: UnknownRecord; key: string }[] = [];
    let cur: UnknownRecord = root;

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]!;
        const next = cur[key];

        if (!isRecord(next)) {
            return;
        }

        chain.push({ parent: cur, key });
        cur = next;
    }

    const leafKey = keys[keys.length - 1]!;
    delete cur[leafKey];

    for (let i = chain.length - 1; i >= 0; i--) {
        const { parent, key } = chain[i]!;
        const node = parent[key];

        if (isRecord(node) && Object.keys(node).length === 0) {
            delete parent[key];
            continue;
        }

        break;
    }
}
