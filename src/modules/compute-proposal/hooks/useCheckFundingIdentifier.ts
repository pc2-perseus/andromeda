import React from "react";
import type { FundingItem } from "../types/FundingItem.ts";
import useFundingItem from "./useFundingItem.ts";
import useIdentifierCheck from "./useIdentifierCheck.ts";

export default function useCheckFundingIdentifier(item: FundingItem) {
    const [storedFundingIdentifier, setStoredFundingIdentifier] =
        useFundingItem(item.name);
    const [storedInstitution] = useFundingItem(`${item.name}$org`);

    const [checked, setChecked] = React.useState(
        Boolean(storedFundingIdentifier)
    );
    const [fundingIdentifier, setFundingIdentifier] = React.useState(
        storedFundingIdentifier ?? ""
    );
    const [fundingInstitution, setFundingInstitution] = React.useState(
        storedInstitution ?? ""
    );

    const { checkingIdentifier, identifierCheckResult } = useIdentifierCheck({
        identifier: fundingIdentifier,
        identifierLinkPrefix: item.identifier_link_prefix,
        enabled: checked,
    });

    React.useEffect(() => {
        if (!checked) {
            setStoredFundingIdentifier(item.add_institution ? "$" : null);
            return;
        }

        if (item.add_institution) {
            setStoredFundingIdentifier(
                `${fundingIdentifier}$${fundingInstitution}`
            );
            return;
        }

        setStoredFundingIdentifier(fundingIdentifier);
    }, [
        checked,
        fundingIdentifier,
        fundingInstitution,
        item.add_institution,
        setStoredFundingIdentifier,
    ]);

    return {
        fundingIdentifier,
        fundingInstitution,
        checkingIdentifier,
        checked,
        setChecked,
        identifierCheckResult,
        setFundingIdentifier,
        setFundingInstitution,
    };
}
