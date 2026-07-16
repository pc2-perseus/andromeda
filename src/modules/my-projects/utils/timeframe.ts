import dayjs from "dayjs";

export function formatTimeframe(start: Date | null, end: Date | null): string {
    if (start && end) {
        return `${dayjs(start).format("DD.MM.YYYY")} - ${dayjs(end).format(
            "DD.MM.YYYY"
        )}`;
    }

    if (start) {
        return `From: ${dayjs(start).format("DD.MM.YYYY")}`;
    }

    if (end) {
        return `To: ${dayjs(end).format("DD.MM.YYYY")}`;
    }

    return "Not available";
}

export function remainingTime(end: Date | null): string | null {
    if (!end) {
        return null;
    }

    const today = dayjs().startOf("day");
    const endDay = dayjs(end).startOf("day");

    if (today.isAfter(endDay)) {
        const days = today.diff(endDay, "day");
        return `${days} day${days === 1 ? "" : "s"} since end`;
    }

    const days = endDay.diff(today, "day");
    return `${days} day${days === 1 ? "" : "s"} until end`;
}
