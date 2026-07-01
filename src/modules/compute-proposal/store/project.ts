import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { type Project, ProjectParams } from "../../../types/perseus/Project.ts";
import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import isoToDates from "../../../utils/isoToDates.ts";
import { removeDeep, setDeep } from "../../../utils/setDeep.ts";
import type { ScientificField } from "../../../types/perseus/ScientificField.ts";
import type { ModuleConfig } from "../../../types/ModuleConfig.ts";
import resourceClusterMatch, {
    resourceMatch,
} from "../../../utils/resourceClusterMatch.ts";
import type { Resource } from "../../../types/perseus/Resource.ts";
import type { Cluster } from "../../../types/perseus/Cluster.ts";
import {
    type ResourceValue,
    ResourceValueParams,
} from "../../../types/perseus/ResourceValue.ts";
import sortResources from "../../../utils/sortResources.ts";
import { shallow } from "zustand/vanilla/shallow";
import { subscribeWithSelector } from "zustand/middleware";
import { produce } from "immer";
import type { Role } from "../../../types/perseus/Role.ts";
import { projectSchema } from "../schema/project.ts";
import { ValidationError } from "yup";
import submitProposal from "../api/submitProposal.ts";
import saveProposal from "../api/saveProposal.ts";

interface ProjectStore {
    project: Project;

    reset: () => void;

    isValidating: boolean;
    validate: () => Promise<boolean>;
    validationErrors: { [key: string]: string };

    isLoading: boolean;
    load: (oid: string) => Promise<void>;
    loadError: string | null;

    isSubmitting: boolean;
    submit: () => Promise<boolean>;
    submitError: string | null;

    isSaving: boolean;
    save: () => Promise<string | null>;
    saveError: string | null;

    config: ModuleConfig | null;
    setConfig: (config: ModuleConfig | null) => void;

    // the currently logged-in person
    personId: string | null;
    setPersonId: (id: string | null) => void;

    setId: (value: string) => void;
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    setAbbreviation: (value: string) => void;
    setType: (value: string | null) => void;
    setOtherInfo: (value: string | null) => void;
    setIsFollowUp: (value: boolean) => void;
    setPredecessorId: (value: string | null) => void;
    setPurpose: (value: string) => void;
    setProfessorship: (value: string) => void;
    setStart: (value: Date | null) => void;
    setEnd: (value: Date | null) => void;

    setIsPublicApproval: (value: boolean) => void;
    setPublicRejectionReason: (value: string | null) => void;
    setPublicTitle: (value: string | null) => void;
    setPublicDescription: (value: string | null) => void;
    setPublicLinks: (value: string | null) => void;
    setSoftware: (value: string | null) => void;

    setFundingItem: (item: string, value: string | null) => void;

    setMainScientificField: (value: ScientificField | null) => void;
    setSecondaryScientificField: (value: ScientificField | null) => void;

    setCustomField: (name: string, value: unknown) => void;
    removeCustomField: (name: string) => void;

    setCurrentRole: (role: Role | null) => void;
    getCurrentRole: () => Role | null;

    setPersonOfContactEmail: (email: string | null) => void;
    isPersonOfContact: () => boolean;

    setPrincipalInvestigatorEmail: (email: string | null) => void;
    isPrincipalInvestigator: () => boolean;

    resources: Resource[];
    setResources: (resources: Resource[]) => void;
    getSortedResources: (cluster: Cluster) => Resource[];
    setRequestedResource: (resource: Resource, value: number) => void;
    getRequestedResource: (resource: Resource) => number;
    setHasStorageRequirements: (value: boolean) => void;
    setStorageRequirements: (value: string) => void;
    showResourceTab: () => string | boolean;

    clusters: Cluster[];
    setClusters: (clusters: Cluster[]) => void;
    getSelectableClusters: () => Cluster[];
    setClusterSelected: (cluster: Cluster, value: boolean) => void;
    isClusterSelected: (cluster: Cluster) => boolean;
    isClusterSelectionFixed: (cluster: Cluster) => boolean;

    setCheckbox: (id: string, value: boolean) => void;
}

const initialState = {
    project: {
        ...ProjectParams,
        custom_fields: {
            custom_abbreviation: false,
            additional_description: {},
            checkboxes: {},
            funding: {
                other: "",
            },
            purpose: "",
            software: "",
            storage_requirements: null,
            public_approval: true,
            other: "",
            pc_email: null,
            pi_email: null,
        },
    },
    isValidating: false,
    validationErrors: {},

    isLoading: false,
    loadError: null,

    isSubmitting: false,
    submitError: null,

    isSaving: false,
    saveError: null,
};

export const useProjectStore = create<ProjectStore>()(
    subscribeWithSelector(
        immer((set, get) => ({
            ...initialState,

            reset: () => {
                set(initialState);
            },

            validate: async () => {
                const { project, config, personId, resources, clusters } =
                    get();

                set({ isValidating: true });

                const errors: { [key: string]: string } = {};

                try {
                    await projectSchema.validate(project, {
                        abortEarly: false,
                        context: {
                            config,
                            resources,
                            clusters,
                            personId,
                        },
                    });
                } catch (err) {
                    if (err instanceof ValidationError) {
                        for (const error of err.inner) {
                            if (!error.path) {
                                throw new Error("Missing path in error");
                            }

                            errors[error.path] = error.message;
                        }
                    }
                } finally {
                    set({ isValidating: false, validationErrors: errors });
                }

                return Object.keys(errors).length === 0;
            },

            load: async (oid) => {
                set({ isLoading: true });
                try {
                    const call = await makeAPICall<Project>(
                        HTTPMethod.GET,
                        `/perseus/service/Andromeda/compute-proposal/single?oid=${oid}`,
                        undefined,
                        true
                    );

                    if (call.statusCode === 200 && call.value) {
                        const project = isoToDates(call.value);

                        if (!project.custom_fields.checkboxes) {
                            project.custom_fields.checkboxes = {};
                        }

                        set({
                            project,
                        });
                    } else {
                        set({
                            loadError:
                                "There was an error loading the proposal, status code: " +
                                call.statusCode,
                        });
                    }
                } catch (e) {
                    if (e instanceof Error) {
                        set({
                            loadError: e.message,
                        });
                    }
                } finally {
                    set({ isLoading: false });
                }
            },

            submit: async () => {
                const { project } = get();

                set({ isSubmitting: true, submitError: null });

                try {
                    return await submitProposal(project);
                } catch {
                    set({
                        submitError:
                            "There was an error while submitting the proposal",
                    });
                } finally {
                    set({ isSubmitting: false });
                }

                return false;
            },

            save: async () => {
                const { project, isSaving, isSubmitting } = get();

                if (isSaving || isSubmitting) {
                    return null;
                }

                // only save if the user actually changed something
                if (shallow(project, initialState.project)) {
                    return null;
                }

                set({ isSaving: true, saveError: null });

                try {
                    const id = await saveProposal(project);

                    if (id) {
                        set((state) => {
                            state.project._id = id;
                        });
                    }

                    return id;
                } catch (e: unknown) {
                    if (e instanceof Error) {
                        set({ saveError: e.message });
                    }
                } finally {
                    set({ isSaving: false });
                }

                return null;
            },

            config: null,
            setConfig: (config) => {
                set({
                    config: produce(config, (c) => {
                        if (!c) return;

                        // Sort scientific fields by name, so we don't have to sort them in the components
                        c.allowed_scientific_fields =
                            c.allowed_scientific_fields.sort((a, b) => {
                                const areaA: string =
                                    a.research_area ?? "Other";
                                const areaB: string =
                                    b.research_area ?? "Other";
                                const areaCompare: number =
                                    areaA.localeCompare(areaB);
                                if (areaCompare !== 0) {
                                    return areaCompare;
                                }
                                return a.subject_id.localeCompare(b.subject_id);
                            });
                    }),
                });
            },

            personId: null,
            setPersonId: (id) => {
                set({ personId: id });
            },

            setId: (id) => {
                set((s) => {
                    s.project._id = id;
                });
            },
            setTitle: (value) => {
                set((state) => {
                    state.project.title = value;

                    if (!state.project.custom_fields.custom_abbreviation) {
                        const prefix = state.config?.abbreviation_prefix ?? "";
                        state.project.abbreviation =
                            prefix +
                            ((value ?? "").match(/\b\p{L}/gu) ?? [])
                                .join("")
                                .toLowerCase();
                    }
                });
            },
            setDescription: (value) => {
                set((state) => {
                    state.project.description = value;
                });
            },
            setAbbreviation: (value) => {
                set((state) => {
                    const prefix = state.config?.abbreviation_prefix;

                    state.project.abbreviation =
                        prefix !== undefined && !value.startsWith(prefix)
                            ? `${prefix}${value}`
                            : value;
                    state.project.custom_fields.custom_abbreviation = true;
                });
            },
            setType: (value) => {
                set((state) => {
                    state.project.project_type = value;
                });
            },
            setOtherInfo: (value) => {
                set((state) => {
                    state.project.custom_fields.other = value;
                });
            },
            setIsFollowUp: (value) => {
                set((state) => {
                    if (!state.project.source) {
                        return;
                    }

                    state.project.source.is_followup = value;

                    if (!value) {
                        state.project.source.predecessor_id = null;
                    }
                });
            },
            setPredecessorId: (value) => {
                set((state) => {
                    if (!state.project.source) {
                        return;
                    }

                    state.project.source.predecessor_id = value;
                });
            },
            setPurpose: (value) => {
                const setCustomField = get().setCustomField;

                setCustomField("purpose", value);
            },
            setProfessorship: (value) => {
                const setCustomField = get().setCustomField;

                setCustomField("professorship", value);
            },
            setStart: (value) => {
                if (Number(value?.getUTCMilliseconds()) < 0) {
                    return;
                }

                set((state) => {
                    state.project.start = value;
                });
            },
            setEnd: (value) => {
                if (Number(value?.getUTCMilliseconds()) < 0) {
                    return;
                }

                set((state) => {
                    state.project.end = value;
                });
            },

            setIsPublicApproval: (value) => {
                get().setCustomField("public_approval", value);
            },
            setPublicRejectionReason: (value) => {
                get().setCustomField(
                    "additional_description.public_rejection_reason",
                    value
                );
            },
            setPublicTitle: (value) => {
                get().setCustomField(
                    "additional_description.public_title",
                    value
                );
            },
            setPublicDescription: (value) => {
                get().setCustomField(
                    "additional_description.public_description",
                    value
                );
            },
            setPublicLinks: (value) => {
                get().setCustomField(
                    "additional_description.public_links",
                    value
                );
            },
            setSoftware: (value) => {
                get().setCustomField("software", value);
            },
            setFundingItem: (item, value) => {
                const { removeCustomField: remove, setCustomField: set } =
                    get();

                if (value === null) {
                    remove(`funding.${item}`);
                } else if (value.includes("$")) {
                    const identifier: string = value.split("$")[0].trim();
                    const org: string = value.split("$")[1].trim();

                    if (identifier.length === 0) {
                        remove(`funding.${item}`);
                    } else {
                        set(`funding.${item}`, identifier);
                    }

                    if (org.length === 0) {
                        remove(`funding.${item}$org`);
                    } else {
                        set(`funding.${item}$org`, org);
                    }
                } else {
                    get().setCustomField(`funding.${item}`, value);
                }
            },

            setMainScientificField: (value) => {
                set((state) => {
                    if (value) {
                        state.project.scientific_fields = [value];
                    } else {
                        state.project.scientific_fields = [];
                    }
                });
            },
            setSecondaryScientificField: (value) => {
                set((state) => {
                    const {
                        project: { scientific_fields },
                    } = get();

                    const main = scientific_fields[0];

                    if (!main) {
                        return;
                    }

                    if (value) {
                        state.project.scientific_fields = [main, value];
                    } else {
                        state.project.scientific_fields = [main];
                    }
                });
            },

            setCustomField: (name, value) => {
                set((state) => {
                    setDeep(state.project.custom_fields, name, value);
                });
            },
            removeCustomField: (name) => {
                set((state) => {
                    removeDeep(state.project.custom_fields, name);
                });
            },

            setPersonOfContactEmail: (email) => {
                get().setCustomField("pc_email", email);
            },
            isPersonOfContact: () => {
                const {
                    project: { person_of_contact_id: personOfContactId },
                    personId,
                } = get();

                return Boolean(personId) && personId === personOfContactId;
            },

            setPrincipalInvestigatorEmail: (email) => {
                get().setCustomField("pi_email", email);
            },
            isPrincipalInvestigator: () => {
                const {
                    project: {
                        principal_investigator_id: principalInvestigatorId,
                    },
                    personId,
                } = get();

                return (
                    Boolean(personId) && personId === principalInvestigatorId
                );
            },

            setCurrentRole: (role) => {
                const { personId } = get();

                switch (role) {
                    case "PI-PC":
                        set((state) => {
                            state.project.principal_investigator_id = personId;
                            state.project.person_of_contact_id = personId;

                            state.project.custom_fields.pc_email = null;
                            state.project.custom_fields.pi_email = null;
                        });
                        break;
                    case "PI":
                        set((state) => {
                            state.project.principal_investigator_id = personId;
                            state.project.person_of_contact_id = null;

                            state.project.custom_fields.pi_email = null;
                        });
                        break;
                    case "PC":
                        set((state) => {
                            state.project.principal_investigator_id = null;
                            state.project.person_of_contact_id = personId;

                            state.project.custom_fields.pc_email = null;
                        });
                        break;
                    default:
                        set((state) => {
                            state.project.principal_investigator_id = null;
                            state.project.person_of_contact_id = null;
                        });
                }
            },
            getCurrentRole: () => {
                const { isPrincipalInvestigator, isPersonOfContact } = get();

                const isPI: boolean = isPrincipalInvestigator();
                const isPC: boolean = isPersonOfContact();

                if (isPI && isPC) {
                    return "PI-PC";
                }

                if (isPI) {
                    return "PI";
                }

                if (isPC) {
                    return "PC";
                }

                return null;
            },

            resources: [],
            setResources: (resources) => {
                set({ resources });
            },
            setRequestedResource: (resource, value) => {
                set((s) => {
                    s.project.requested_resources = [
                        ...s.project.requested_resources.filter(
                            (rv) => rv.resource_id !== resource.id
                        ),
                        {
                            ...ResourceValueParams,
                            resource_id: resource.id,
                            start: s.project.start ?? new Date(),
                            end: s.project.end ?? new Date(),
                            value: value,
                        },
                    ];
                });
            },
            getRequestedResource: (resource) => {
                const {
                    project: { requested_resources: requestedResources },
                } = get();

                return (
                    requestedResources.find(
                        (rv) => rv.resource_id === resource.id
                    )?.value ?? 0
                );
            },
            getSortedResources: (cluster) => {
                const {
                    project: { project_type: projectType },
                    resources,
                    clusters,
                    config,
                } = get();

                if (!projectType || !config) {
                    return [];
                }

                const allowedResources: Resource[] = resources
                    .filter((r: Resource) =>
                        config.allowed_resources[projectType]
                            .map((item) => item.resource_id)
                            .includes(r.id)
                    )
                    .filter((r: Resource) => r.cluster_id === cluster.id);

                return sortResources(
                    allowedResources,
                    clusters,
                    projectType in config.allowed_resources
                        ? config.allowed_resources[projectType]
                        : []
                );
            },
            showResourceTab: () => {
                const {
                    project: { project_type: projectType, start, end },
                    config,
                } = get();

                if (!config) {
                    return false;
                }

                if (projectType === null) {
                    return "Please select a project type to proceed with resource selection.";
                }

                if (
                    !(projectType in config.allowed_resources) ||
                    config.allowed_resources[projectType].length === 0
                ) {
                    return `Projects of type "${projectType}" do not require manual resource selections.`;
                }

                if (start === null || end === null) {
                    return "Please add a start and end date to proceed with resource selection.";
                }

                return true;
            },
            setHasStorageRequirements: (value) => {
                get().setCustomField("storage_requirements", value ? "" : null);
            },
            setStorageRequirements: (value) => {
                get().setCustomField("storage_requirements", value);
            },

            clusters: [],
            setClusters: (clusters) => {
                set({ clusters: clusters });
            },
            getSelectableClusters: () => {
                const {
                    project: { project_type: projectType },
                    config,
                    resources,
                    clusters,
                } = get();

                if (!config) {
                    return [];
                }

                if (
                    projectType === null ||
                    !(projectType in config.allowed_resources)
                ) {
                    return [];
                }

                const filteredClusters: Cluster[] = config.allowed_resources[
                    projectType
                ]
                    .map((item) => item.resource_id)
                    .map(
                        (resourceId: string) =>
                            resourceClusterMatch(
                                resourceId,
                                resources,
                                clusters
                            ).cluster
                    )
                    .filter((c: Cluster | undefined) => c !== undefined);

                return [
                    ...new Map(
                        filteredClusters.map((c: Cluster) => [c.id, c])
                    ).values(),
                ];
            },
            setClusterSelected: (cluster, value) => {
                const {
                    project: {
                        start,
                        end,
                        requested_resources: requestedResources,
                    },
                    getSortedResources,
                } = get();
                const clusterResources = getSortedResources(cluster);

                const requestedResourcesWithoutCluster =
                    requestedResources.filter(
                        (rv) =>
                            !clusterResources.find(
                                (cr) => cr.id === rv.resource_id
                            )
                    );

                // add or remove cluster resources to / from requested resources
                if (value) {
                    set((s) => {
                        s.project.requested_resources =
                            requestedResourcesWithoutCluster.concat(
                                clusterResources.map((resource) => ({
                                    ...ResourceValueParams,
                                    resource_id: resource.id,
                                    start: start ?? new Date(),
                                    end: end ?? new Date(),
                                    value: 0,
                                }))
                            );
                    });
                } else {
                    set((s) => {
                        s.project.requested_resources =
                            requestedResourcesWithoutCluster;
                    });
                }
            },
            isClusterSelected: (cluster) => {
                const {
                    project: { requested_resources: requestedResources },
                    resources,
                } = get();

                return (
                    requestedResources.filter(
                        (rv: ResourceValue) =>
                            resourceMatch(rv.resource_id, resources)
                                ?.cluster_id === cluster.id
                    ).length > 0
                );
            },
            isClusterSelectionFixed: (cluster) => {
                const {
                    project: { project_type: projectType },
                    config,
                    resources,
                } = get();

                if (!projectType || !config) {
                    return false;
                }

                if (!(projectType in config.allowed_resources)) {
                    return false;
                }

                return config.allowed_resources[projectType].some(
                    (item) =>
                        item.required &&
                        resourceMatch(item.resource_id, resources)
                            ?.cluster_id === cluster.id
                );
            },

            setCheckbox: (id, value) => {
                set((s) => {
                    (
                        s.project.custom_fields.checkboxes as {
                            [key: string]: boolean;
                        }
                    )[id] = value;
                });
            },
        }))
    )
);

let normalizing = false;
useProjectStore.subscribe(
    (s) => [s.project, s.config] as const,
    ([project, config]) => {
        if (!config) {
            return;
        }

        if (normalizing) {
            return;
        }

        const normalizedProject = produce(project, (draft) => {
            const type = draft.project_type;
            const start = draft.start;
            const end = draft.end;

            // Set the end date in case it is configured this way
            if (
                type !== null &&
                start !== null &&
                Object.keys(config.fixed_length).includes(type)
            ) {
                if (typeof config.fixed_length[type] === "string") {
                    const fixedEnd = new Date(
                        config.fixed_length[type] as string
                    );
                    if (end === null || end.valueOf() !== fixedEnd.valueOf()) {
                        draft.end = fixedEnd;
                    }
                } else {
                    const { years, months, weeks, days } = config.fixed_length[
                        type
                    ] as {
                        days: number;
                        weeks: number;
                        months: number;
                        years: number;
                    };

                    const newEnd: Date = new Date(
                        Date.UTC(
                            start.getFullYear() + years,
                            start.getMonth() + months,
                            start.getDate() + weeks * 7 + days
                        ) - 1000
                    );

                    if (
                        draft.end === null ||
                        draft.end.toISOString() !== newEnd.toISOString()
                    ) {
                        draft.end = newEnd;
                    }
                }
            }

            // Set required resources if necessary
            if (draft.start !== null && draft.end !== null && type !== null) {
                const startDate = draft.start;
                const endDate = draft.end;
                const requiredResources: {
                    resource_id: string;
                    min?: number;
                    max?: number;
                    required?: boolean;
                }[] =
                    type in config.allowed_resources
                        ? config.allowed_resources[type].filter((i) =>
                              Boolean(i.required)
                          )
                        : [];

                requiredResources.forEach((item) => {
                    const exists = draft.requested_resources.some(
                        (rv: ResourceValue) =>
                            rv.resource_id === item.resource_id
                    );

                    if (!exists) {
                        draft.requested_resources.push({
                            ...ResourceValueParams,
                            resource_id: item.resource_id,
                            start: new Date(startDate.valueOf()),
                            end: new Date(endDate.valueOf()),
                            value: item.min === undefined ? 0 : item.min,
                        });
                    }
                });
            }

            // Keep requested resource dates in sync with project dates
            draft.requested_resources.forEach((rv: ResourceValue) => {
                if (
                    draft.start !== null &&
                    rv.start.valueOf() !== draft.start.valueOf()
                ) {
                    rv.start = new Date(draft.start.valueOf());
                }

                if (
                    draft.end !== null &&
                    rv.end.valueOf() !== draft.end.valueOf()
                ) {
                    rv.end = new Date(draft.end.valueOf());
                }
            });
        });

        if (normalizedProject === project) {
            return;
        }

        normalizing = true;
        try {
            useProjectStore.setState({ project: normalizedProject });
        } finally {
            normalizing = false;
        }
    },
    { equalityFn: shallow }
);
