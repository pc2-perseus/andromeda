import React from "react";
import getLoginOptions from "../../../../login/api/getLoginOptions";
import getLinkedProviders from "../../../api/getLinkedProviders";

type Provider = {
    identifier: string;
    display_name: string;
    linked: boolean;
};

export default function useProviders() {
    const [providers, setProviders] = React.useState<Provider[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const load = React.useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const [options, linkedProviders] = await Promise.all([
                getLoginOptions(),
                getLinkedProviders(),
            ]);
            const linkedProviderSet = new Set(linkedProviders);

            const mapped = options.map((opt: any) => ({
                ...opt,
                linked: linkedProviderSet.has(opt.identifier.toLowerCase()),
            }));

            setProviders(mapped);
        } catch {
            setError("Failed to load providers");
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        load();
    }, [load]);

    return {
        providers,
        loading,
        error,
        totalLinked: providers.filter((p) => p.linked).length,
        refresh: load,
    };
}
