export function formatValue(value: string | number | null): string {
    if (value === null || value === "") {
        return "-";
    }

    return `${value}`;
}

export function formatDate(value: Date | null): string {
    if (value === null) {
        return "-";
    }

    return value.toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
    });
}

export function formatDurationMinutes(value: number | null): string {
    if (value === null) {
        return "-";
    }

    const totalMinutes = Math.max(0, value);
    const days = Math.floor(totalMinutes / (24 * 60));
    const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
    const minutes = totalMinutes % 60;
    const parts = [];

    if (days > 0) {
        parts.push(`${days}d`);
    }
    if (hours > 0 || days > 0) {
        parts.push(`${hours}h`);
    }
    parts.push(`${minutes}m`);

    return parts.join(" ");
}
