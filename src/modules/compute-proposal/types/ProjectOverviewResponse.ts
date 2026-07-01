export type ProjectOverviewItem = {
    _id: string;
    abbreviation: string | null;
    title: string | null;
};

export type ProjectOverviewResponse = {
    items: ProjectOverviewItem[];
};
