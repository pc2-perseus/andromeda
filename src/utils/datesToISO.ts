export default function datesToISO<T>(value: T): T {
    if (value instanceof Date) {
        return value.toISOString() as T;
    }

    if (Array.isArray(value)) {
        return value.map((item) => datesToISO(item)) as T;
    }

    if (value !== null && typeof value === "object") {
        const result: { [key: string]: unknown } = {};
        for (const key in value) {
            result[key] = datesToISO(
                (value as { [key: string]: unknown })[key]
            );
        }
        return result as T;
    }

    return value;
}
