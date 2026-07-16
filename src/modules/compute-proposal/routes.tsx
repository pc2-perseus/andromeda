import ComputeProposalList from "./index.tsx";
import type { RouteElement } from "../../types/RouteElement.ts";
import ComputeProposal from "./components/ComputeProposal.tsx";
import ClaimPC from "./components/ClaimPC.tsx";
import ClaimPI from "./components/ClaimPI.tsx";
import ComputeProposalDetails from "./components/detail";

export const routes: RouteElement[] = [
    {
        path: "/compute-proposal",
        element: <ComputeProposalList />,
        requiresLogin: true,
    },
    {
        path: "/compute-proposal/new",
        element: <ComputeProposal />,
        requiresLogin: true,
    },
    {
        path: "/compute-proposal/:proposalId",
        element: <ComputeProposal />,
        requiresLogin: true,
    },
    {
        path: "/compute-proposal/submitted/:proposalId",
        element: <ComputeProposalDetails />,
        requiresLogin: true,
    },
    {
        path: "/compute-proposal/:proposalId/claim-pc",
        element: <ClaimPC />,
        requiresLogin: true,
    },
    {
        path: "/compute-proposal/:proposalId/claim-pi",
        element: <ClaimPI />,
        requiresLogin: true,
    },
];
