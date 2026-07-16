import useAuthQuery from "./useAuthQuery.ts";

export default function useAuth() {
    return useAuthQuery().data;
}
