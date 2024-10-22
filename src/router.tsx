import { createBrowserRouter, Outlet } from "react-router-dom";
import { createSupabaseAuthRepository } from "./modules/auth/infra/SupabaseAuthRepository";
import { createSupabaseOnboardinRepository } from "./modules/onboarding/infra";
import { createSupabaseTeamsRepository } from "./modules/teams/infra/SupabaseTeamsRepository";
import { Login, SignUp } from "./pages/auth";
import { AuthProvider } from "./pages/auth/AuthProvider";
import Page, { Skeletons } from "./pages/dashboard/Dashboard";
import { LayoutProvider } from "./pages/dashboard/LayoutProvider";
import { App } from "./pages/landing";
import { Onboarding } from "./pages/onboarding/Onboarding";
import { OnboardingProvider } from "./pages/onboarding/OnboardingProvider";

const repo = createSupabaseAuthRepository();
const onboardingRepo = createSupabaseOnboardinRepository();
const teamsRepo = createSupabaseTeamsRepository();

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider authRepo={repo}>
        <LayoutProvider teamsRepo={teamsRepo}>
          <Outlet />
        </LayoutProvider>
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <App />
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
      },
      {
        path: "/app",
        element: <Page />,
        children: [
          {
            index: true,
            element: <Skeletons />
          },
          {
            path: "/app/tasks",
            element: <>Text</>
          }
        ]
      }
    ]
  }
]);
