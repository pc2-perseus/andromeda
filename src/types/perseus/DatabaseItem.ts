export type DatabaseItem = {
    _id: string | null;
    files?: { [key: string]: string };
    file_tags?: { [key: string]: string[] };
};

export const DatabaseItemParams: DatabaseItem = {
    _id: null,
    files: {},
    file_tags: {},
};
