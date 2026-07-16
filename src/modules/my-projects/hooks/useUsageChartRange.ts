import { useMemo } from "react";
import dayjs from "dayjs";
import type { ResourceUsage } from "../../../types/perseus/ResourceUsage.ts";

export type UsageRange =
    | "14-days"
    | "1-month"
    | "2-months"
    | "3-months"
    | "6-months"
    | "one-year"
    | "two-years"
    | "all-time";

export const USAGE_RANGE_OPTIONS: { value: UsageRange; label: string }[] = [
    { value: "14-days", label: "14 days" },
    { value: "1-month", label: "1 month" },
    { value: "2-months", label: "2 months" },
    { value: "3-months", label: "3 months" },
    { value: "6-months", label: "6 months" },
    { value: "one-year", label: "One year" },
    { value: "two-years", label: "Two years" },
    { value: "all-time", label: "All time" },
];

export const DEFAULT_USAGE_RANGE: UsageRange = "1-month";

function getRangeStartDate(
    toDate: dayjs.Dayjs,
    range: UsageRange
): dayjs.Dayjs | null {
    switch (range) {
        case "14-days":
            return toDate.subtract(14, "day").startOf("day");
        case "1-month":
            return toDate.subtract(1, "month").startOf("day");
        case "2-months":
            return toDate.subtract(2, "month").startOf("day");
        case "3-months":
            return toDate.subtract(3, "month").startOf("day");
        case "6-months":
            return toDate.subtract(6, "month").startOf("day");
        case "one-year":
            return toDate.subtract(1, "year").startOf("day");
        case "two-years":
            return toDate.subtract(2, "year").startOf("day");
        case "all-time":
            return null;
    }
}

export default function useUsageChartRange({
    usage,
    projectEnd,
    selectedRange,
}: {
    usage: ResourceUsage[];
    projectEnd: Date | null;
    selectedRange: UsageRange;
}) {
    const fallbackToDate = useMemo(() => {
        const today = dayjs.utc().endOf("day");
        const projectEndDate = projectEnd
            ? dayjs.utc(projectEnd).endOf("day")
            : null;

        if (!projectEndDate || projectEndDate.isAfter(today)) {
            return today;
        }

        return projectEndDate;
    }, [projectEnd]);

    const filterEndDate = useMemo(() => {
        const lastUsageDate = usage.reduce<dayjs.Dayjs | null>(
            (latest, item) => {
                const current = dayjs.utc(item.end).endOf("day");
                if (!latest || current.isAfter(latest)) {
                    return current;
                }
                return latest;
            },
            null
        );

        return (lastUsageDate ?? fallbackToDate).toDate();
    }, [usage, fallbackToDate]);

    const allTimeStartDate = useMemo(
        () =>
            usage.reduce<dayjs.Dayjs | null>((earliest, item) => {
                const current = dayjs.utc(item.start).startOf("day");
                if (!earliest || current.isBefore(earliest)) {
                    return current;
                }
                return earliest;
            }, null),
        [usage]
    );

    const availableRangeOptions = useMemo(() => {
        if (!allTimeStartDate) {
            return USAGE_RANGE_OPTIONS;
        }

        const toDate = dayjs.utc(filterEndDate).startOf("day");
        return USAGE_RANGE_OPTIONS.filter((option) => {
            const startDate = getRangeStartDate(toDate, option.value);
            return startDate === null || !startDate.isBefore(allTimeStartDate);
        });
    }, [allTimeStartDate, filterEndDate]);

    const filterStartDate = useMemo(() => {
        const toDate = dayjs.utc(filterEndDate);
        const startDate = getRangeStartDate(toDate, selectedRange);
        return startDate ? startDate.toDate() : null;
    }, [selectedRange, filterEndDate]);

    const defaultRange = useMemo(
        () =>
            availableRangeOptions.some(
                (item) => item.value === DEFAULT_USAGE_RANGE
            )
                ? DEFAULT_USAGE_RANGE
                : "all-time",
        [availableRangeOptions]
    );

    return {
        filterEndDate,
        filterStartDate,
        availableRangeOptions,
        defaultRange,
    };
}
