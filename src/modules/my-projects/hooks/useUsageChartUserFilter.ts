import { useMemo, useState } from "react";
import type { ResourceUsage } from "../../../types/perseus/ResourceUsage.ts";

export default function useUsageChartUserFilter({
    usage,
    enableUserFilter,
}: {
    usage: ResourceUsage[];
    enableUserFilter: boolean;
}) {
    const [requestedUser, setSelectedUser] = useState<string | null>(null);

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

    const selectedUser =
        enableUserFilter &&
        requestedUser !== null &&
        users.includes(requestedUser)
            ? requestedUser
            : null;

    return {
        users,
        selectedUser,
        setSelectedUser,
    };
}
