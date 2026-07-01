export type UsedContingentPhase = {
    start: Date;
    end: Date;
    value: number;
    max: number;
};

export type UsedContingent = {
    resource_id: string;
    phases: UsedContingentPhase[];
};
