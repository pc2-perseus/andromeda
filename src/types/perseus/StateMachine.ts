import type { StateMachineEvent } from "./StateMachineEvent.ts";

export type StateMachine = {
    current_states: string[];
    events: StateMachineEvent[];
    graph: string;
};
