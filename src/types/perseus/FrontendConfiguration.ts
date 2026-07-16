import type { DatabaseItem } from "./DatabaseItem.ts";

export type FrontendConfiguration = DatabaseItem & {
    project_type_colors: Record<string, string | null>;
    state_event_colors: Record<string, string | null>;
    state_event_names: Record<string, string | null>;
};
