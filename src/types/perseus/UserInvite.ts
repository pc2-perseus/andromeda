import type { DatabaseItem } from "./DatabaseItem.ts";

export type UserInvite = DatabaseItem & {
    email: string;
    compute_project: string;
    created: Date;
};
