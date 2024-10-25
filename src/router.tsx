import { createBrowserRouter } from "react-router-dom";
import { createSupabaseDashboardProjectsRepository } from "./modules/dashboard/infra/SupabaseProjectsRepository";
import { createSupabaseOnboardinRepository } from "./modules/onboarding/infra";
import { createSupabaseTeamsRepository } from "./modules/teams/infra/SupabaseTeamsRepository";
import { Login, SignUp } from "./pages/auth";
import { Protected } from "./pages/auth/AuthProvider/Protected";
import Page, { Skeletons } from "./pages/dashboard/Dashboard";
import { DashboardProjectsProvider } from "./pages/dashboard/DashboardProjectsProvider/DashboardProjectsProvider";
import { LayoutProvider } from "./pages/dashboard/LayoutProvider";
import { Onboarding } from "./pages/onboarding/Onboarding";
import { OnboardingProvider } from "./pages/onboarding/OnboardingProvider";

const onboardingRepo = createSupabaseOnboardinRepository();
const teamsRepo = createSupabaseTeamsRepository();
const projectsRepo = createSupabaseDashboardProjectsRepository();

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <LayoutProvider teamsRepo={teamsRepo}>
          <DashboardProjectsProvider projectsRepo={projectsRepo}>
            <Page />
          </DashboardProjectsProvider>
        </LayoutProvider>
      </Protected>
    ),
    children: [
      {
        index: true,
        element: <Skeletons />
      },
      {
        path: "/tasks",
        element: <>Text</>
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/onboarding",
    element: (
      <OnboardingProvider repo={onboardingRepo}>
        <Onboarding />
      </OnboardingProvider>
    )
  }
]);
