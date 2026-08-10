import React from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
} from "@mui/material";
import type { UsageRange } from "../../../../hooks/useUsageChartRange.ts";

export default function SelectFilters({
    availableRangeOptions,
    selectedRange,
    setSelectedRange,
    showUserFilter,
    selectedUser,
    setSelectedUser,
    users,
}: {
    availableRangeOptions: { value: UsageRange; label: string }[];
    selectedRange: UsageRange;
    setSelectedRange: (value: UsageRange) => void;
    showUserFilter: boolean;
    selectedUser: string | null;
    setSelectedUser: (value: string | null) => void;
    users: string[];
}): React.ReactElement {
    return (
        <Stack direction="row" sx={{ gap: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="usage-chart-range-filter-label">
                    Range
                </InputLabel>
                <Select
                    labelId="usage-chart-range-filter-label"
                    label="Range"
                    value={selectedRange}
                    onChange={(event) =>
                        setSelectedRange(event.target.value as UsageRange)
                    }
                >
                    {availableRangeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {showUserFilter ? (
                <FormControl fullWidth>
                    <InputLabel id="usage-chart-user-filter-label">
                        User
                    </InputLabel>
                    <Select
                        labelId="usage-chart-user-filter-label"
                        label="All users"
                        value={selectedUser ?? ""}
                        onChange={(event) =>
                            setSelectedUser(event.target.value || null)
                        }
                    >
                        <MenuItem value="">All users</MenuItem>
                        {users.map((user) => (
                            <MenuItem key={user} value={user}>
                                {user}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : null}
        </Stack>
    );
}
