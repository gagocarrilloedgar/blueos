import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { AccountsList } from "./pages/accounts/AccountList";
import { Settings } from "./pages/accounts/Settings";
import { Login, SignUp } from "./pages/auth";
import { General } from "./pages/chats";
import {
  EditProject,
  EditProjectSheet
} from "./pages/dashboard/EditProject/EditProject";
import DashboardLayout from "./pages/DashboardLayout";
import { ConfirmAccount } from "./pages/invite/ConfirmAccount";
import { Notifications } from "./pages/notifications";
import { Onboarding } from "./pages/onboarding/Onboarding";
import { OnboardingProvider } from "./pages/onboarding/OnboardingProvider";
import { Documents } from "./pages/private/documents";
import { Tasks } from "./pages/private/tasks";
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
            element: <EditProjectSheet />
          }
        ]
      },
      {
        path: "/notifications",
        element: <Notifications />
      },
      {
        path: "/accounts",
        element: <AccountsList />
      },
      {
        path: "/settings",
        element: <Settings />
      },
      {
        path: "/documents",
        element: <Documents />
      },
      {
        path: "/tasks",
        element: <Tasks />
      },
      {
        path: "/chats",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Navigate to="/chats/general" replace />
          },
          {
            path: "/chats/general",
            element: <General />
          }
        ]
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
