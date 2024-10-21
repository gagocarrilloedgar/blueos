import { createBrowserRouter, Outlet } from "react-router-dom";
import { createSupabaseAuthRepository } from "./modules/auth/infra/SupabaseAuthRepository";
import { createSupabaseOnboardinRepository } from "./modules/onboarding/infra";
import { Login, SignUp } from "./pages/auth";
import { AuthProvider } from "./pages/auth/AuthProvider";
import Page from "./pages/dashboard/Dashboard";
import { App } from "./pages/landing";
import { Onboarding } from "./pages/onboarding/Onboarding";
import { OnboardingProvider } from "./pages/onboarding/OnboardingProvider";

const repo = createSupabaseAuthRepository();
const onboardingRepo = createSupabaseOnboardinRepository();

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider authRepo={repo}>
        <Outlet />
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
        children: [
          {
            index: true,
            element: <Page />
          }
        ]
      }
    ]
  }
]);
