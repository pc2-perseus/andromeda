export type AndromedaTicketPayload = {
    subject: string;
    body: string;
    project_oid: string | null;
    compute_project_id: string | null;
    service_oids: string[];
    job_id: number | null;
};
