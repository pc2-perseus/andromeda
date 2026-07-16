import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ValidationError } from "yup";
import { ticketSchema } from "../schema/ticket.ts";

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

        reset: () => set(initialState),
    }))
);
