# Andromeda

Andromeda is a web application that provides a unified interface for end users, principal investigators, persons of contact, and project members to interact with a PERSEUS system.

Instead of accessing individual PERSEUS services directly, users sign in to Andromeda and manage their projects, compute proposals, support requests, and other available functionality from a single application.

Andromeda communicates with PERSEUS exclusively through the Gateway, which routes requests to the appropriate backend services.

## Features

Andromeda currently provides the following feature modules:

- Authentication
- User Profile Management
- Compute Proposals
- Project Management
- Support Tickets
- System Status

## Tech Stack

- React
- TypeScript
- Vite
- Material UI
- React Router
- Zustand
- Keycloak Authentication

## Prerequisites

Before running Andromeda, ensure you have:

- Node.js
- npm

A running PERSEUS instance is also required, including:

- Gateway
- Authentication Service (Keycloak)
- Required backend services

Andromeda cannot operate as a standalone application.

---

# Getting Started

Install dependencies:

```bash
npm ci --ignore-scripts
```

Start the development server:

```bash
npm run dev
```

The application will be available through the Vite development server.

---

# Available Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the application for production. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs ESLint. |

---

# Configuration

Andromeda communicates with PERSEUS through the Gateway.

The Gateway URL is configured in `src/config.ts`.

```ts
const CONFIG: ConfigData = {
    GATEWAY_URL: import.meta.env.DEV
        ? "http://localhost:8001/gateway"
        : window.env.VITE_API_URL,
};
```

## Development

When running the application using

```bash
npm run dev
```

Vite automatically enables development mode (`import.meta.env.DEV`).

During development, Andromeda sends all API requests to:

```
http://localhost:8001/gateway
```

Ensure that a local Gateway instance is running at this address before starting the application.

## Production

In production builds, the Gateway URL is **not** compiled into the application.

Instead, it is provided at runtime through:

```javascript
window.env.VITE_API_URL
```

The runtime configuration is injected by the Docker entrypoint before the application is served.

This allows the same application build to be deployed across multiple environments without rebuilding.

Example:

```javascript
window.env = {
    VITE_API_URL: "https://example.org/gateway",
};
```

---

# Authentication

Authentication is handled through **Keycloak**.

Users authenticate using the configured Keycloak realm, and authenticated requests are forwarded through the PERSEUS Gateway.

---
# Development

To develop Andromeda, a running instance of the PERSEUS Gateway is required.

Andromeda communicates exclusively with the Gateway for all backend interactions. The Gateway is responsible for routing requests to the appropriate PERSEUS services.

By default, the development configuration expects the Gateway to be available at:

```text
http://localhost:8001/gateway
```

If your Gateway is running on a different address, update the configuration accordingly.

---

# Project Structure

```
src
├── api            API helper functions
├── components     Shared reusable UI components
├── contexts       React contexts and providers
├── fundamentals   Shared application fundamentals
├── modules        Feature modules
├── types          Shared TypeScript types
├── utils          Utility functions
├── App.tsx        Root application component
├── PageRouter.tsx Application routing
├── config.ts      Runtime configuration
└── main.tsx       Application entry point
```

## Module Overview

| Module | Description |
|---------|-------------|
| Authentication | User authentication and session management |
| Profile | User profile management |
| Compute Proposals | Create and manage compute proposals |
| Projects | View and manage projects |
| Support Tickets | Create and manage support requests |
| System Status | View the status of PERSEUS services |


---

# Building for Production

Create a production build with:

```bash
npm run build
```

The generated files will be placed in the `dist` directory and can be served by any static web server.

The production Gateway URL is provided at runtime through the Docker entrypoint and does not require rebuilding the application for different environments.

---

# License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

# Learn More

For more information about PERSEUS:

- **PERSEUS Repository**  
  https://github.com/pc2-perseus/perseus

- **Documentation**  
  https://perseus-project.pc2.uni-paderborn.de/docs/

- **Live Demo**  
  https://perseus-project.pc2.uni-paderborn.de/preview/