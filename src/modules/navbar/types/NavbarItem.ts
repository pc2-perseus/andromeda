export type NavbarItem = {
    title: string; // displayed title in the navbar
    href: string; // link that will be opened on click (can also be external)
    order?: number; // the lower the number the further left will the item be positioned
    target?: "_blank" | "_self" | "_parent" | "_top" | "framename"; // same as <a> attribute
    condition?: "always" | "logged-out" | "logged-in"; // When to show the item in the navbar
    children?: NavbarItem[]; // will be visible if mouse hovers over element
};
