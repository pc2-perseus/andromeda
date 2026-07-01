import React from "react";
import type { MyProject } from "../../../types/project.ts";
import Person from "./Person.tsx";
import PersonSkeleton from "./PersonSkeleton.tsx";
import useResponsibleUsers from "../../../hooks/useResponsibleUsers.ts";

export default function PersonOfContact({
    project,
}: {
    project: MyProject;
}): React.ReactElement {
    const { responsibleUsers, loading } = useResponsibleUsers(project._id);
    const personOfContact = responsibleUsers?.person_of_contact;
    const name = personOfContact
        ? [
              personOfContact.title,
              personOfContact.firstname,
              personOfContact.lastname,
          ]
              .filter(Boolean)
              .join(" ")
        : undefined;

    if (loading) {
        return <PersonSkeleton title="Person of Contact" />;
    }

    return (
        <Person
            title="Person of Contact"
            email={personOfContact?.email}
            personId={personOfContact?._id}
            name={name}
            phone={personOfContact?.phone}
            homepage={personOfContact?.homepage}
        />
    );
}
