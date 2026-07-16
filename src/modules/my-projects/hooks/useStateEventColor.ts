import React from "react";
import useFrontendConfigurationQuery from "./useFrontendConfigurationQuery.ts";

export default function useStateEventColor(stateId: string): string | null {
    const { data: configuration } = useFrontendConfigurationQuery();

    return React.useMemo(
        () => configuration?.state_event_colors[stateId] ?? null,
        [configuration, stateId]
    );
}
