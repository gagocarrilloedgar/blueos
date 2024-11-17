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

import { QueryClient } from "@tanstack/react-query";
import { projectBreadcrumbLoader } from "./pages/projects/projectBreadcrumbLoader";
import { Project } from "./pages/projects/ProjectsList/columns";

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    handle: {
      crumb: () => ({
        label: "Home",
        href: "/"
      })
    },
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
        handle: {
          crumb: () => ({
            label: "Home",
            href: "/"
          })
        },
        element: <DashboardLayout />,
        children: [
          {
            path: "/edit-project/:projectId",
            handle: {
              crumb: (data: Project, params: { projectId: string }) => ({
                label: `Edit project ${data.name}`,
                href: `/edit-project/${params.projectId}`
              })
            },
            element: <EditProjectSheet />
          }
        ]
      },
      {
        path: "/notifications",
        handle: {
          crumb: () => ({
            label: "Notifications",
            href: "/notifications"
          })
        },
        element: <Notifications />
      },
      {
        path: "/accounts",
        handle: {
          crumb: () => ({
            label: "Accounts",
            href: "/accounts"
          })
        },
        element: <AccountsList />
      },
      {
        path: "/settings",
        handle: {
          crumb: () => ({
            label: "Settings",
            href: "/settings"
          })
        },
        element: <Settings />
      },
      {
        path: "/documents",
        handle: {
          crumb: () => ({
            label: "Documents",
            href: "/documents"
          })
        },
        element: <Documents />
      },
      {
        path: "/tasks",
        handle: {
          crumb: () => ({
            label: "Tasks",
            href: "/tasks"
          })
        },
        element: <Tasks />
      },
      {
        path: "/chats",
        handle: {
          crumb: () => ({
            label: "Chats",
            href: "/chats"
          })
        },
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Navigate to="/chats/general" replace />
          },
          {
            path: "/chats/general",
            handle: {
              crumb: () => ({
                label: "General",
                href: "/chats/general"
              })
            },
            element: <General />
          }
        ]
      },
      {
        path: "/projects",
        element: <Outlet />,
        handle: {
          crumb: () => ({
            label: "Projects",
            href: "/projects"
          })
        },
        children: [
          {
            index: true,
            element: <ProjectsList />
          },
          {
            path: "/projects/:projectId/details",
            loader: ({ params }) =>
              projectBreadcrumbLoader(params)(queryClient),
            handle: {
              crumb: (data: Project, params: { projectId: string }) => ({
                label: data.name,
                href: `/projects/${params.projectId}/details`
              })
            },
            element: (
              <>
                <ProjectsList />
                <EditProject />
              </>
            )
          },
          {
            path: "/projects/:projectId",
            loader: ({ params }) =>
              projectBreadcrumbLoader(params)(queryClient),
            handle: {
              crumb: (data: Project, params: { projectId: string }) => ({
                label: data.name,
                href: `/projects/${params.projectId}`
              })
            },
            element: <>Test</>
          }
        ]
      }
    ]
  }
]);
