import type { Person } from "../types/perseus/Person.ts";

export default function personFullName(person: Person): string {
    return `${person.title === null ? "" : `${person.title} `}${person.firstname} ${person.lastname}`;
}
