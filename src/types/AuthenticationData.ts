import type { Person } from "./perseus/Person.ts";

export type AuthenticationData = {
    oid: string | null;
    person: Person | null;
    username: string | null;
    validSession: boolean;
    auth_provider?: string;
};
