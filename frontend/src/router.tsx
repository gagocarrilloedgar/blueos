import { useAuth, useSignUp } from "@clerk/clerk-react";
import { useEffect } from "react";
import { createBrowserRouter, Outlet, useNavigate } from "react-router-dom";
import { Sheet, SheetContent } from "./components/ui/sheet";
import { Login, SignUp } from "./pages/auth";
import { DashboardProjectsProvider } from "./pages/dashboard/DashboardProjectsProvider/DashboardProjectsProvider";
import { Widgets } from "./pages/dashboard/Widgets";
import { Onboarding } from "./pages/onboarding/Onboarding";
import { OnboardingProvider } from "./pages/onboarding/OnboardingProvider";
import RootLayout from "./pages/RootLayout";

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const { signUp } = useSignUp();

  const status = signUp?.status;

  useEffect(() => {
    if (isLoaded && status === "missing_requirements") {
      navigate("/signup#/verify-email-address");
    }

    if (isLoaded && status === "abandoned") {
      navigate("/signup");
    }

    if (isLoaded && !userId) {
      navigate("login");
    }
  }, [isLoaded]);

  if (!isLoaded) return "Loading...";

  return (
    <DashboardProjectsProvider>
      <Widgets />
      <Outlet />
    </DashboardProjectsProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            path: "/team-accounts",
            element: (
              <Sheet open={true}>
                <SheetContent>text</SheetContent>
              </Sheet>
            )
          }
        ]
      },
      {
        path: "/tasks",
        element: <>Text</>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      }
    ]
  },
  {
    path: "/onboarding",
    element: (
      <OnboardingProvider>
        <Onboarding />
      </OnboardingProvider>
    )
  }
]);
