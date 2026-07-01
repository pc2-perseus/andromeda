import type { DatabaseItem } from "./DatabaseItem.ts";

export type Location = DatabaseItem & {
    country: string;
    state: string | null;
    postal_code: string | null;
    city: string | null;
    street: string | null;
};
