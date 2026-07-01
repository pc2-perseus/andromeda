import type { DatabaseItem } from "./DatabaseItem.ts";
import type { Location } from "./Location.ts";

export type Organization = DatabaseItem & {
    name: string;
    secondary_names: string[];
    location: Location;
};
