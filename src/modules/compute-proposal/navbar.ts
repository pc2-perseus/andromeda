import type { NavbarItem } from "../navbar/types/NavbarItem.ts";

export const navbar: NavbarItem[] = [
    {
        title: "My projects",
        order: 1,
        href: "#",
        condition: "logged-in",
        children: [
            {
                title: "Proposals",
                order: 5,
                href: "/compute-proposal",
                condition: "logged-in",
            },
        ],
    },
];
