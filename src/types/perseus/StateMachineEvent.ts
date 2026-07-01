export type StateMachineEvent = {
    state_id: string;
    value: string[] | null;
    comment: string | null;
    by: string | null;
    occurred: Date;
    state_overwrite: string[] | null;
};
