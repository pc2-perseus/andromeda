// React imports
import React from "react";
import ReactDOM from "react-dom/client";

// Custom imports
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "./api/client.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);
