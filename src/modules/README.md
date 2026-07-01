# Modules

Please add all components that can be configured in any way or form here.

## Structure

When creating a new module, please follow the following structure:

```
modules/
|-- new-module
|   |-- index.tsx
|   |-- ModuleConfig.ts
|   |-- navbar.ts
|   |-- routes.tsx
|   |-- api/
|   |-- components/
|   |-- functions/
|   |-- types/
```

## index.tsx

This file exports the module. It should look like this:

```tsx
import React from "react";

export default function Home(): React.ReactElement {
    return <></>; // Build your module here
}
```

This module will be available at `/module/new-module` (the directory's name).

## routes.tsx

If you want the module to be included in the main app and available at a specific path,
add the following to the `routes.tsx` file:

```tsx
import Home from "./";
import type { RouteElement } from "../../types/RouteElement.ts";

export const routes: RouteElement[] = [
    { path: "/my-path", element: <Home />, requiresLogin: false },
];
```

You can add as many routes as you want.

## navbar.ts

This file exports the items that should be displayed within the navbar.
The file should look like the following:

```ts
import type { NavbarItem } from "../../types/NavbarItem.ts";

export const navbar: NavbarItem[] = [
    {
        title: "Google",
        order: 0,
        href: "https://www.google.com/",
        target: "_blank",
    },
];
```

Please note that links on items will not work on mobile if the item has children.
