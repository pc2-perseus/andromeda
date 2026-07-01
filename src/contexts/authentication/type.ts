import type { AuthenticationData } from "../../types/AuthenticationData.ts";

export type AuthenticationContextData = {
    authData: AuthenticationData;
    loading: boolean;
    maintenance: boolean;
    reloadAuthData: () => void;
};
