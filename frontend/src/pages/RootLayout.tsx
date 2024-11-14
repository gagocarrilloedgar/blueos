import { Loader } from "@/components/ui/loader";
import { env } from "@/config/env";
import { ClerkProvider, useAuth, useSignUp } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth as useAccountAuth } from "./auth/AuthProvider/useAuth";
import Layout from "./dashboard/Dashboard";
import { LayoutProvider } from "./dashboard/LayoutProvider";

if (!env.clerkPublishableKey) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  return (
    <ClerkProvider
      routerPush={(to) => {
        window.location.href = to;
      }}
      routerReplace={(to) => {
        window.location.href = to;
      }}
      publishableKey={env.clerkPublishableKey}
    >
      <AuthProvider>
        <LayoutProvider>
          <LayoutWithoutAuth />
        </LayoutProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}

const useIsAuthScreen = () => {
  const { pathname } = useLocation();

  const noLayoutScreens = ["login", "signup", "onboarding", "confirm"];

  return noLayoutScreens.some((screen) => pathname.includes(screen));
};

const LayoutWithoutAuth = () => {
  const isAuthScreen = useIsAuthScreen();

  if (isAuthScreen) return <Outlet />;

  return (
    <AuthLoader>
      <Layout />
    </AuthLoader>
  );
};

const AuthLoader = ({ children }: { children: React.ReactNode }) => {
  const { userId, isLoaded } = useAuth();
  const { account, loading } = useAccountAuth();
  const navigate = useNavigate();
  const { signUp } = useSignUp();

  const status = signUp?.status;

  useEffect(() => {
    if (isLoaded && userId && signUp?.status === "abandoned") {
      navigate("/signup");
    }
  }, [isLoaded, userId, signUp?.status, navigate]);

  useEffect(() => {
    if (isLoaded && !account && !loading) navigate("/onboarding");

    if (isLoaded && status === "abandoned") navigate("/signup");

    if (isLoaded && !userId) navigate("/login");
  }, [isLoaded, userId, account, loading, status]);

  if (loading || !account) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return children;
};
