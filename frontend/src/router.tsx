import { createBrowserRouter, Outlet } from "react-router-dom";
import { Sheet, SheetContent } from "./components/ui/sheet";
import { Login, SignUp } from "./pages/auth";
import { EditProject } from "./pages/dashboard/EditProject/EditProject";
import DashboardLayout from "./pages/DashboardLayout";
import { Onboarding } from "./pages/onboarding/Onboarding";
import { OnboardingProvider } from "./pages/onboarding/OnboardingProvider";
import ProjectsList from "./pages/projects/ProjectsList/ProjectsList";
import RootLayout from "./pages/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            path: "/team-accounts",
            element: (
              <Sheet open={true}>
                <SheetContent>text</SheetContent>
              </Sheet>
            )
          },
          {
            path: "/edit-project/:projectId",
            element: <EditProject />
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
      },
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
      }
    ]
  }
]);
