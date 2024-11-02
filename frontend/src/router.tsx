import { createBrowserRouter } from "react-router-dom";
import { Sheet, SheetContent } from "./components/ui/sheet";
import { Login, SignUp } from "./pages/auth";
import { EditProject } from "./pages/dashboard/EditProject/EditProject";
import DashboardLayout from "./pages/DashboardLayout";
import { Onboarding } from "./pages/onboarding/Onboarding";
import { OnboardingProvider } from "./pages/onboarding/OnboardingProvider";
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
        path: "/tasks",
        element: <>Text</>
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
