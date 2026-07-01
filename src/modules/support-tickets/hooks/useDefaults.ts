import React from "react";
import type { SystemStatusService } from "../../../types/perseus/SystemStatusService.ts";
import type { MyProjectListItem } from "../../my-projects/types/project.ts";
import useAuthentication from "../../../contexts/authentication";
import useComputeProjectsForUser from "./useComputeProjectsForUser.ts";
import useComputeProjectSelection from "./useComputeProjectSelection.ts";
import useProject from "./useProject.ts";
import useProjectSelection from "./useProjectSelection.ts";
import useServiceGroupSelection from "./useServiceGroupSelection.ts";
import useServiceSelection from "./useServiceSelection.ts";

export default function useDefaults({
    projects,
    serviceGroups,
}: {
    projects: MyProjectListItem[];
    serviceGroups: {
        key: string;
        title: string;
        services: { service: SystemStatusService }[];
    }[];
}): {
    computeProjects: ReturnType<typeof useComputeProjectsForUser>;
    projectLoading: boolean;
    serviceOptions: SystemStatusService[];
} {
    const {
        authData: { oid },
    } = useAuthentication();
    const { value: selectedProjectOid, setValue: setSelectedProjectOid } =
        useProjectSelection();
    const {
        value: selectedComputeProjectId,
        setValue: setSelectedComputeProjectId,
    } = useComputeProjectSelection();
    const projectInitRef = React.useRef(false);
    const computeProjectInitRef = React.useRef(false);
    const {
        value: selectedServiceGroupKey,
        setValue: setSelectedServiceGroupKey,
    } = useServiceGroupSelection();
    const { value: selectedServiceOid, setValue: setSelectedServiceOid } =
        useServiceSelection();

    React.useEffect(() => {
        if (projects.length === 0) {
            setSelectedProjectOid("");
            return;
        }

        const hasSelectedProject = projects.some(
            (project) => project._id === selectedProjectOid
        );
        if (!hasSelectedProject && !projectInitRef.current) {
            setSelectedProjectOid(projects[0]._id ?? "");
            projectInitRef.current = true;
        }
    }, [projects, selectedProjectOid, setSelectedProjectOid]);

    const { project: selectedProject, loading: projectLoading } =
        useProject(selectedProjectOid);
    const computeProjects = useComputeProjectsForUser(selectedProject, oid);

    React.useEffect(() => {
        if (computeProjects.length === 0) {
            setSelectedComputeProjectId("");
            return;
        }

        const hasSelectedComputeProject = computeProjects.some(
            (computeProject) =>
                computeProject.compute_project_id === selectedComputeProjectId
        );
        if (!hasSelectedComputeProject && !computeProjectInitRef.current) {
            setSelectedComputeProjectId(computeProjects[0].compute_project_id);
            computeProjectInitRef.current = true;
        }
    }, [
        computeProjects,
        selectedComputeProjectId,
        setSelectedComputeProjectId,
    ]);

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

    return {
        computeProjects,
        projectLoading,
        serviceOptions,
    };
}
