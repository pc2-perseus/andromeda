const ISO_DATE_REGEX: RegExp =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;

export default function isoToDates<T>(value: T): T {
    if (typeof value === "string" && ISO_DATE_REGEX.test(value)) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
            return date as T;
        }
        return value;
    }

    if (Array.isArray(value)) {
        return value.map((item) => isoToDates(item)) as T;
    }

    if (value !== null && typeof value === "object") {
        const result: { [key: string]: unknown } = {};
        for (const key in value) {
            result[key] = isoToDates(
                (value as { [key: string]: unknown })[key]
            );
        }
        return result as T;
    }

    return value;
}
