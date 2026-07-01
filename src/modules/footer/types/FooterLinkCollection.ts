export type FooterLinkCollection = {
    header: {
        title: string;
        href: string;
        target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
    };
    items: {
        title: string;
        href: string;
        target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
    }[];
};
