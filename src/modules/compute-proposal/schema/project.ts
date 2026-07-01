import * as yup from "yup";
import dayjs from "dayjs";
import type { ModuleConfig } from "../../../types/ModuleConfig.ts";
import resourceClusterMatch, {
    resourceMatch,
} from "../../../utils/resourceClusterMatch.ts";
import resourceUnit from "../../../utils/resourceUnit.ts";
import getItemName from "../functions/getItemName.ts";
import commaSeperatedList from "../../../utils/commaSeperatedList.ts";
import type { Resource } from "../../../types/perseus/Resource.ts";
import type { Cluster } from "../../../types/perseus/Cluster.ts";
import {
    ABBREVIATION_ALLOWED_PATTERN,
    ABBREVIATION_MAX_LENGTH,
    PROJECT_TITLE_MAX_LENGTH,
} from "../constants/validation.ts";

const isEmpty = (str: string | null | unknown): boolean =>
    str === null || (typeof str === "string" && str.trim() === "");

const abbreviationWithoutPrefix = (
    abbreviation: string | undefined,
    config: ModuleConfig | undefined
): string => {
    const prefix = config?.abbreviation_prefix;

    if (prefix && abbreviation?.startsWith(prefix)) {
        return abbreviation.slice(prefix.length);
    }

    return abbreviation ?? "";
};

export const sourceSchema = yup.object({
    is_followup: yup.boolean(),
    predecessor_id: yup
        .string()
        .nullable()
        .when("is_followup", {
            is: true,
            then: (schema) => schema.required("Please select a predecessor"),
            otherwise: (schema) => schema.notRequired(),
        }),
});

export const customFieldsSchema = yup.object({
    purpose: yup.string().required("Please select a purpose for this proposal"),

    storage_requirements: yup
        .string()
        .nullable()
        .test(
            "not-empty-if-present",
            "Please explain to us which special storage requirements your project demands.",
            (value) => !value || value.trim().length > 0
        ),

    additional_description: yup
        .object()
        .required()
        .when("public_approval", {
            is: true,
            then: (schema) =>
                schema.shape({
                    public_title: yup
                        .string()
                        .required("Please enter a public project description"),
                    public_description: yup
                        .string()
                        .required("Please enter a public project description"),
                    public_rejection_reason: yup.string().nullable(),
                }),
            otherwise: (schema) =>
                schema.shape({
                    public_title: yup.string().nullable(),
                    public_description: yup.string().nullable(),
                    public_rejection_reason: yup
                        .string()
                        .required(
                            "Please enter a reason why your project cannot be publicly displayed"
                        ),
                }),
        }),

    pc_email: yup.string().nullable(),
    pi_email: yup.string().nullable(),

    checkboxes: yup.object().nullable(),
});

export const projectSchema = yup
    .object()
    .shape({
        project_type: yup.string().required("Please select a project type"),
        title: yup
            .string()
            .required("Please enter a project title")
            .max(
                PROJECT_TITLE_MAX_LENGTH,
                `Project title can contain a maximum of ${PROJECT_TITLE_MAX_LENGTH} characters`
            ),
        abbreviation: yup
            .string()
            .test(
                "min-length",
                "Please enter an abbreviation",
                function (value) {
                    const config = this.options.context?.config as
                        | ModuleConfig
                        | undefined;

                    return abbreviationWithoutPrefix(value, config).length > 0;
                }
            )
            .test(
                "max-length",
                `Abbreviation can contain a maximum of ${ABBREVIATION_MAX_LENGTH} characters`,
                function (value) {
                    const config = this.options.context?.config as
                        | ModuleConfig
                        | undefined;

                    return (
                        abbreviationWithoutPrefix(value, config).length <=
                        ABBREVIATION_MAX_LENGTH
                    );
                }
            )
            .test(
                "allowed-characters",
                "Abbreviation may only contain letters and numbers (A-Z, a-z, 0-9)",
                function (value) {
                    const config = this.options.context?.config as
                        | ModuleConfig
                        | undefined;
                    const abbreviation = abbreviationWithoutPrefix(
                        value,
                        config
                    );

                    return (
                        abbreviation.length === 0 ||
                        ABBREVIATION_ALLOWED_PATTERN.test(abbreviation)
                    );
                }
            ),
        description: yup
            .string()
            .required(
                "Please enter an abstract explaining your research topic"
            ),

        scientific_fields: yup
            .array()
            .required()
            .min(1, "Please select at least one scientific field"),

        start: yup
            .date()
            .required()
            .nullable()
            .test("lead-time", function (value: Date | null) {
                const config = this.options.context?.config as ModuleConfig;
                const leadDays = Number(config.minimum_lead_days ?? 0);
                const today = dayjs.utc().startOf("day");
                const latestAllowedStart = today.add(1, "year");

                if (value === null || value === undefined) {
                    return this.createError({
                        message:
                            "Please choose a start day for your project" +
                            (leadDays > 0
                                ? ` which is at least ${leadDays} days from now`
                                : ""),
                    });
                }

                const startDate = dayjs.utc(value).startOf("day");

                if (startDate.isBefore(today, "day")) {
                    return this.createError({
                        message: "Dates in the past are not allowed",
                    });
                }

                if (startDate.isAfter(latestAllowedStart, "day")) {
                    return this.createError({
                        message:
                            "Dates more than 1 year in the future are not allowed",
                    });
                }

                if (leadDays > 0) {
                    const minDate = dayjs.utc().add(leadDays - 1, "day");
                    if (minDate.isAfter(startDate)) {
                        return this.createError({
                            message: `Please choose a start day for your project which is at least ${leadDays} days from now`,
                        });
                    }
                }

                return true;
            }),

        source: sourceSchema.nullable(),

        principal_investigator_id: yup.string().nullable(),
        person_of_contact_id: yup.string().nullable(),

        requested_resources: yup
            .array()
            .of(
                yup.object({
                    resource_id: yup.string().required(),
                    value: yup.number().required(),
                })
            )
            .required(),

        custom_fields: customFieldsSchema,
    })
    .test(
        "at-least-one-role",
        "Please select your role in this project",
        function (value) {
            const pi = value?.principal_investigator_id;
            const poc = value?.person_of_contact_id;

            if (isEmpty(pi) && isEmpty(poc)) {
                return this.createError({
                    path: "role",
                });
            }

            return true;
        }
    )
    .test("require-counterparty-email", function (value) {
        const {
            principal_investigator_id: piId,
            person_of_contact_id: pocId,
            custom_fields,
        } = value ?? {};
        const pcEmail = custom_fields?.pc_email;
        const piEmail = custom_fields?.pi_email;

        if (!isEmpty(piId) && isEmpty(pocId) && isEmpty(pcEmail)) {
            return this.createError({
                path: "custom_fields.pc_email",
                message:
                    "Please enter the email address of the person of contact",
            });
        }

        if (!isEmpty(pocId) && isEmpty(piId) && isEmpty(piEmail)) {
            return this.createError({
                path: "custom_fields.pi_email",
                message:
                    "Please enter the email address of the principal investigator",
            });
        }

        return true;
    })
    .test(
        "required-checkboxes-for-pi",
        "Required checkboxes missing",
        function (value) {
            const config = this.options.context?.config as ModuleConfig;
            const personId = this.options.context?.personId as string | null;

            if (!value) return true;

            const isPI = value.principal_investigator_id === personId;
            if (!isPI) return true;

            const allCheckboxes = (value.custom_fields?.checkboxes || {}) as {
                [key: string]: boolean;
            };

            for (const checkbox of config.required_checkboxes || []) {
                if (
                    checkbox.required &&
                    (!allCheckboxes[checkbox.id] ||
                        !(checkbox.id in allCheckboxes))
                ) {
                    return this.createError({
                        path: `custom_fields.checkboxes.${checkbox.id}`,
                        message: "Please check this checkbox to continue",
                    });
                }
            }

            return true;
        }
    )
    .test("resource-limits", function (project) {
        const {
            config,
            resources,
            clusters,
        }: {
            config: ModuleConfig;
            resources: Resource[];
            clusters: Cluster[];
        } = this.options.context as {
            config: ModuleConfig;
            resources: Resource[];
            clusters: Cluster[];
        };

        if (!project) return true;
        if (!config) return false;

        const projectType = project.project_type;
        if (
            projectType === null ||
            !config.resource_limits ||
            !(projectType in config.resource_limits)
        ) {
            return true;
        }

        const errors: yup.ValidationError[] = [];

        for (const item of config.resource_limits[projectType]) {
            const total = project.requested_resources.reduce((acc, rv) => {
                return (
                    acc +
                    (item.resource_ids.includes(rv.resource_id) ? rv.value : 0)
                );
            }, 0);

            const min = item?.min;
            const max = item?.max;

            const violatesMin = min !== undefined && total < min;
            const violatesMax = max !== undefined && total > max;

            if (!violatesMin && !violatesMax) continue;

            const resource = resourceMatch(item.resource_ids[0], resources);
            const { unit, unitFactor } = resourceUnit(resource);

            if (!resource) continue;

            const activeResourceIds = new Set(
                project.requested_resources.map((rv) => rv.resource_id)
            );

            const resourceList = item.resource_ids
                .filter((resourceId: string) =>
                    activeResourceIds.has(resourceId)
                )
                .map((resourceId: string) =>
                    resourceClusterMatch(resourceId, resources, clusters)
                )
                .filter(
                    (elem) =>
                        elem.resource !== undefined &&
                        elem.cluster !== undefined
                )
                .map(
                    (elem) =>
                        `${getItemName(elem.resource as Resource, config.alternative_names)} on ${getItemName(
                            elem.cluster as Cluster,
                            config.alternative_names
                        )}`
                );

            const resourceLabel =
                resourceList.length > 0
                    ? commaSeperatedList(resourceList)
                    : getItemName(resource, config.alternative_names);
            const prefix = `The ${resourceList.length > 1 ? "combined total" : "total"} amount of ${resourceLabel} must`;

            const msg = violatesMin
                ? `${prefix} be higher than ${min / unitFactor}${unit}`
                : `${prefix} not exceed ${(max as number) / unitFactor}${unit}`;

            for (const resourceId of item.resource_ids) {
                errors.push(
                    this.createError({
                        path: "requested_resources." + resourceId,
                        message: msg,
                    })
                );
            }

            errors.push(
                this.createError({
                    path: "resource_limits." + resource.id,
                    message: msg,
                })
            );
        }

        if (errors.length > 0) {
            throw new yup.ValidationError(errors);
        }

        return true;
    });
