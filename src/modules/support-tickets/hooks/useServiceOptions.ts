import React from "react";

import type { SystemStatusService } from "../../../types/perseus/SystemStatusService.ts";
import type { SystemStatusGroup } from "../../system-status/types/SystemStatusGroup.ts";
import useServiceGroupSelection from "./useServiceGroupSelection.ts";
import useServiceSelection from "./useServiceSelection.ts";

export default function useServiceOptions(
    serviceGroups: SystemStatusGroup[]
): SystemStatusService[] {
    const {
        value: selectedServiceGroupKey,
        setValue: setSelectedServiceGroupKey,
    } = useServiceGroupSelection();
    const { value: selectedServiceOid, setValue: setSelectedServiceOid } =
        useServiceSelection();

    React.useEffect(() => {
        if (selectedServiceGroupKey === "") {
            setSelectedServiceOid("");
            return;
        }

        const hasSelectedGroup = serviceGroups.some(
            (group) => group.key === selectedServiceGroupKey
        );
        if (!hasSelectedGroup) {
            setSelectedServiceGroupKey("");
            setSelectedServiceOid("");
        }
    }, [
        selectedServiceGroupKey,
        serviceGroups,
        setSelectedServiceGroupKey,
        setSelectedServiceOid,
    ]);

    const selectedServiceGroup = React.useMemo(
        () =>
            serviceGroups.find(
                (group) => group.key === selectedServiceGroupKey
            ) ?? null,
        [selectedServiceGroupKey, serviceGroups]
    );

    const serviceOptions = React.useMemo(
        () =>
            selectedServiceGroup?.services.map(
                (serviceItem) => serviceItem.service
            ) ?? [],
        [selectedServiceGroup]
    );

    React.useEffect(() => {
        if (serviceOptions.length === 0) {
            setSelectedServiceOid("");
            return;
        }

        const hasSelectedService = serviceOptions.some(
            (service) => service._id === selectedServiceOid
        );
        if (!hasSelectedService) {
            setSelectedServiceOid("");
        }
    }, [selectedServiceOid, serviceOptions, setSelectedServiceOid]);

    return serviceOptions;
}
