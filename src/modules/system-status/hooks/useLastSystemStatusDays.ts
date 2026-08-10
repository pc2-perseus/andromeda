import React from "react";

export default function useLastSystemStatusDays(dayCount = 14): Date[] {
    return React.useMemo((): Date[] => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return Array.from({ length: dayCount }, (_, index: number): Date => {
            const day = new Date(today);
            day.setDate(today.getDate() - (dayCount - 1 - index));
            return day;
        });
    }, [dayCount]);
}
