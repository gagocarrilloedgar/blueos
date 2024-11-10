import { createBrowserRouter, Outlet } from "react-router-dom";
import { AccountsList } from "./pages/accounts/AccountList";
import { Login, SignUp } from "./pages/auth";
import { EditProject } from "./pages/dashboard/EditProject/EditProject";
import DashboardLayout from "./pages/DashboardLayout";
import { ConfirmAccount } from "./pages/invite/ConfirmAccount";
import { Onboarding } from "./pages/onboarding/Onboarding";
import { OnboardingProvider } from "./pages/onboarding/OnboardingProvider";
import ProjectsList from "./pages/projects/ProjectsList/ProjectsList";
import RootLayout from "./pages/RootLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/login*",
        element: <Login />
      },
      {
        path: "/signup*",
        element: <SignUp />
      },
      {
        path: "/onboarding",
        element: (
          <OnboardingProvider>
            <Onboarding />
          </OnboardingProvider>
        )
      },
      {
        path: "/confirm",
        element: <ConfirmAccount />
      },
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            path: "/edit-project/:projectId",
            element: <EditProject />
          }
        ]
      },
      {
        path: "/accounts",
        element: <AccountsList />
      },
      {
        path: "/projects",
        element: <Outlet />,
        children: [
          {
            path: "/projects/:projectId",
            element: <>Test</>
          },
          {
            path: "",
            element: (
              <>
                <ProjectsList />
                <Outlet />
              </>
            ),
            children: [
              {
                path: "/projects/:projectId/details",
                element: <EditProject />
              }
            ]
          }
        ]
      }
    ]
  }
]);
