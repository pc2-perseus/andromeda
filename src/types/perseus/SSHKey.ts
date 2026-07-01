export type SSHKey = {
    _id: string;
    name: string;
    pub_ssh_key: string;
    created_at: string;
    invalid_at: string | null;
    person_oid: string;
};
