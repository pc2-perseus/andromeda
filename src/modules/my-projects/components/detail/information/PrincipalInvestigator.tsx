import React from "react";
import type { MyProject } from "../../../types/project.ts";
import Person from "./Person.tsx";
import PersonSkeleton from "./PersonSkeleton.tsx";
import useResponsibleUsers from "../../../hooks/useResponsibleUsers.ts";

export default function PrincipalInvestigator({
    project,
}: {
    project: MyProject;
}): React.ReactElement {
    const { responsibleUsers, loading } = useResponsibleUsers(project._id);
    const principalInvestigator = responsibleUsers?.principal_investigator;
    const name = principalInvestigator
        ? [
              principalInvestigator.title,
              principalInvestigator.firstname,
              principalInvestigator.lastname,
          ]
              .filter(Boolean)
              .join(" ")
        : undefined;

    if (loading) {
        return <PersonSkeleton title="Principal Investigator" />;
    }

    return (
        <Person
            title="Principal Investigator"
            email={principalInvestigator?.email}
            personId={principalInvestigator?._id}
            name={name}
            phone={principalInvestigator?.phone}
            homepage={principalInvestigator?.homepage}
        />
    );
}
