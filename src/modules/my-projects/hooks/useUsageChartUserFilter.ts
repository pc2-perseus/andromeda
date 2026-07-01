import { useEffect, useMemo, useState } from "react";
import type { ResourceUsage } from "../../../types/perseus/ResourceUsage.ts";

export default function useUsageChartUserFilter({
    usage,
    enableUserFilter,
}: {
    usage: ResourceUsage[];
    enableUserFilter: boolean;
}) {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const users = useMemo(
        () =>
            [
                ...new Set(
                    usage
                        .map((item) => item.user)
                        .filter((user): user is string => !!user)
                ),
            ].sort((left, right) => left.localeCompare(right)),
        [usage]
    );

    useEffect(() => {
        if (selectedUser !== null && !users.includes(selectedUser)) {
            setSelectedUser(null);
        }
    }, [selectedUser, users]);

    useEffect(() => {
        if (!enableUserFilter && selectedUser !== null) {
            setSelectedUser(null);
        }
    }, [enableUserFilter, selectedUser]);

    return {
        users,
        selectedUser,
        setSelectedUser,
    };
}
