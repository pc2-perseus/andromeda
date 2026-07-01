export const DataDeletionKey = {
    ABBREVIATION: "abbreviation",
    TITLE: "title",
    DESCRIPTION: "description",
    PROJECT_TYPE: "project_type",
    CALL: "call",
    SOURCE: "source",
    SOURCE_RAW: "source_raw",
    AFFILIATION: "affiliation",
    PRINCIPAL_INVESTIGATOR: "principal_investigator",
    PERSON_OF_CONTACT: "person_of_contact",
    MEMBER_IDS: "member_ids",
    SCIENTIFIC_FIELDS: "scientific_fields",
    START: "start",
    END: "end",
    CUSTOM_FIELDS: "custom_fields",
} as const;

export type DataDeletionKey =
    (typeof DataDeletionKey)[keyof typeof DataDeletionKey];
