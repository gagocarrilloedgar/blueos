import { ClerkProvider } from "@clerk/clerk-react";
import { MultisessionAppSupport } from "@clerk/clerk-react/internal";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Avoid redirecting to app inside the login page
  return (
    <ClerkProvider
      routerPush={(to) => {
        if (pathname === "/login" && to === "/") return;
        navigate(to);
      }}
      routerReplace={(to) => {
        if (pathname === "/login" && to === "/") return;
        navigate(to, { replace: true });
      }}
      publishableKey={PUBLISHABLE_KEY}
    >
      <MultisessionAppSupport>
        <Outlet />
      </MultisessionAppSupport>
    </ClerkProvider>
  );
}
