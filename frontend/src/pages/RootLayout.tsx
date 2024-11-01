import { ClerkProvider, useAuth, useSignUp } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import Layout from "./dashboard/Dashboard";
import { LayoutProvider } from "./dashboard/LayoutProvider";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => {
        navigate(to);
      }}
      routerReplace={(to) => {
        navigate(to, { replace: true });
      }}
      publishableKey={PUBLISHABLE_KEY}
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

  return pathname.includes("login") || pathname.includes("signup");
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
  const navigate = useNavigate();
  const { signUp } = useSignUp();

  const status = signUp?.status;

  useEffect(() => {
    if (isLoaded && userId && signUp?.status === "abandoned") {
      navigate("/signup");
    }
  }, [isLoaded, userId, signUp?.status, navigate]);

  useEffect(() => {
    if (isLoaded && status === "missing_requirements") {
      navigate("/signup#/verify-email-address");
    }

    if (isLoaded && status === "abandoned") {
      navigate("/signup");
    }

    if (isLoaded && !userId) {
      navigate("/login");
    }
  }, [isLoaded, userId]);

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-sky-400 opacity-75"></span>
      </div>
    );
  }

  return children;
};
