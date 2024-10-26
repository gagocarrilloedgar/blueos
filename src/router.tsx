import { createBrowserRouter } from "react-router-dom";
import { createSupabaseDashboardProjectsRepository } from "./modules/dashboard/infra/SupabaseProjectsRepository";
import { createSupabaseOnboardinRepository } from "./modules/onboarding/infra";
import { createSupabaseSidebarRepository } from "./modules/sidebar/infra/SupabaseSidebarRepository";
import { Login, SignUp } from "./pages/auth";
import { Protected } from "./pages/auth/AuthProvider/Protected";
import Page from "./pages/dashboard/Dashboard";
import { DashboardProjectsProvider } from "./pages/dashboard/DashboardProjectsProvider/DashboardProjectsProvider";
import { LayoutProvider } from "./pages/dashboard/LayoutProvider";
import { Widgets } from "./pages/dashboard/Widgets";
import { Onboarding } from "./pages/onboarding/Onboarding";
import { OnboardingProvider } from "./pages/onboarding/OnboardingProvider";

const onboardingRepo = createSupabaseOnboardinRepository();
const teamsRepo = createSupabaseSidebarRepository();
const projectsRepo = createSupabaseDashboardProjectsRepository();

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <LayoutProvider teamsRepo={teamsRepo}>
          <Page />
        </LayoutProvider>
      </Protected>
    ),
    children: [
      {
        index: true,
        element: (
          <DashboardProjectsProvider projectsRepo={projectsRepo}>
            <Widgets />
          </DashboardProjectsProvider>
        )
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
