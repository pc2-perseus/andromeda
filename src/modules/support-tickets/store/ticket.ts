import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ValidationError } from "yup";
import attachAttachment from "../api/attach.ts";
import createTicket from "../api/createTicket.ts";
import { ATTACHMENT_WARNING } from "../constants.ts";
import { ticketSchema } from "../schema/ticket.ts";

type SubmissionState = {
    attachmentWarning: string | null;
};

type FormStore = {
    subject: string;
    setSubject: (value: string) => void;

    body: string;
    setBody: (value: string) => void;

    selectedProjectOid: string;
    setSelectedProjectOid: (value: string) => void;

    selectedComputeProjectId: string;
    setSelectedComputeProjectId: (value: string) => void;

    selectedServiceGroupKey: string;
    setSelectedServiceGroupKey: (value: string) => void;

    selectedServiceOid: string;
    setSelectedServiceOid: (value: string) => void;

    jobIdInput: string;
    setJobIdInput: (value: string) => void;

    attachment: File | null;
    setAttachment: (value: File | null) => void;

    isValidating: boolean;
    validationErrors: { [key: string]: string };
    validate: () => Promise<boolean>;
    setValidationError: (path: string, message: string) => void;
    clearValidationError: (path: string) => void;

    submitError: string | null;

    isSubmitting: boolean;
    submit: () => Promise<boolean>;

    submissionState: SubmissionState | null;
    setSubmissionState: (value: SubmissionState | null) => void;
    attach: (messageOid: string) => Promise<boolean>;

    reset: () => void;
};

const initialState = {
    subject: "",
    body: "",
    selectedProjectOid: "",
    selectedComputeProjectId: "",
    selectedServiceGroupKey: "",
    selectedServiceOid: "",
    jobIdInput: "",
    attachment: null,
    isValidating: false,
    validationErrors: {},
    submitError: null,
    isSubmitting: false,
    submissionState: null,
};

export const useTicketStore = create<FormStore>()(
    immer((set, get) => ({
        ...initialState,

        setSubject: (value) => set({ subject: value }),

        setBody: (value) => set({ body: value }),

        setSelectedProjectOid: (value) => set({ selectedProjectOid: value }),

        setSelectedComputeProjectId: (value) =>
            set({ selectedComputeProjectId: value }),

        setSelectedServiceGroupKey: (value) =>
            set({ selectedServiceGroupKey: value }),

        setSelectedServiceOid: (value) => set({ selectedServiceOid: value }),

        setJobIdInput: (value) => set({ jobIdInput: value }),

        setAttachment: (value) => set({ attachment: value }),

        validate: async () => {
            const { subject, body, jobIdInput, attachment } = get();

            set({ isValidating: true });

            const errors: { [key: string]: string } = {};

            try {
                await ticketSchema.validate(
                    {
                        subject,
                        body,
                        jobIdInput,
                        attachment,
                    },
                    { abortEarly: false }
                );
            } catch (error) {
                if (error instanceof ValidationError) {
                    for (const item of error.inner) {
                        if (!item.path || item.path in errors) {
                            continue;
                        }

                        errors[item.path] = item.message;
                    }
                }
            } finally {
                set({ isValidating: false, validationErrors: errors });
            }

            return Object.keys(errors).length === 0;
        },

        setValidationError: (path, message) =>
            set((state) => {
                state.validationErrors[path] = message;
            }),

        clearValidationError: (path) =>
            set((state) => {
                delete state.validationErrors[path];
            }),

        submit: async () => {
            const {
                subject,
                body,
                selectedProjectOid,
                selectedComputeProjectId,
                selectedServiceOid,
                jobIdInput,
                attachment,
                attach,
                validate,
            } = get();

            set({ isSubmitting: true, submitError: null });

            try {
                const valid = await validate();

                if (!valid) {
                    return false;
                }

                const created = await createTicket({
                    subject: subject.trim(),
                    body: body.trim(),
                    project_oid: selectedProjectOid || null,
                    compute_project_id: selectedComputeProjectId || null,
                    service_oids:
                        selectedServiceOid === "" ? [] : [selectedServiceOid],
                    job_id:
                        jobIdInput.trim() === ""
                            ? null
                            : Number.parseInt(jobIdInput.trim(), 10),
                });

                if (!created.result) {
                    set({
                        submitError:
                            "The support ticket could not be submitted.",
                    });
                    return false;
                }

                let attachmentWarning: string | null = null;
                if (attachment !== null) {
                    if (created.message_oid === null) {
                        attachmentWarning = ATTACHMENT_WARNING;
                    } else {
                        const uploaded = await attach(created.message_oid);

                        if (!uploaded) {
                            attachmentWarning = ATTACHMENT_WARNING;
                        }
                    }
                }

                set({
                    submissionState: { attachmentWarning },
                });
                return true;
            } catch {
                set({
                    submitError: "The support ticket could not be submitted.",
                });
                return false;
            } finally {
                set({ isSubmitting: false });
            }
        },

        setSubmissionState: (value) => set({ submissionState: value }),

        attach: async (messageOid) => {
            const { attachment } = get();

            if (attachment === null) {
                return true;
            }

            try {
                return await attachAttachment(messageOid, attachment);
            } catch {
                return false;
            }
        },

        reset: () => set(initialState),
    }))
);
