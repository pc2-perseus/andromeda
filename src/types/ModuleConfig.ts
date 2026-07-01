import type { ScientificField } from "./perseus/ScientificField.ts";

export type ModuleConfig = {
    project_types: string[];
    minimum_lead_days: number;
    abbreviation_prefix?: string;
    purposes: string[];
    fixed_length: {
        [key: string]:
            | string
            | {
                  days: number;
                  weeks: number;
                  months: number;
                  years: number;
              };
    };
    allowed_resources: {
        [key: string]: {
            resource_id: string;
            order?: number;
            min?: number;
            max?: number;
            required?: boolean;
            info_text?: string | null;
        }[];
    };
    alternative_names: {
        type: "cluster" | "resource";
        id: string;
        name: string;
    }[];
    resource_limits: {
        [key: string]: {
            resource_ids: string[];
            min?: number;
            max?: number;
        }[];
    };
    allowed_scientific_fields: ScientificField[];
    selectable_funding: {
        name: string;
        identifier_link_prefix?: string;
        add_institution?: boolean;
        info_text?: string | null;
    }[];
    required_checkboxes: {
        id: string;
        label: string;
        required?: boolean;
    }[];
    info_texts: { [key: string]: string | null };
    cluster_resources_danger_threshold?: number;
};
