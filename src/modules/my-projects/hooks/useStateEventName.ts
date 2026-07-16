import React from "react";
import useFrontendConfigurationQuery from "./useFrontendConfigurationQuery.ts";

export default function useStateEventName(stateId: string): string {
    const { data: configuration } = useFrontendConfigurationQuery();

    return React.useMemo(
        () => configuration?.state_event_names[stateId] ?? stateId,
        [configuration, stateId]
    );
}
