import { PropsWithChildren } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const Protected = ({ children }: PropsWithChildren) => {
  const { account, session, loading } = useAuth();
  const navigate = useNavigate();

  if (account || loading) return <>{children}</>;

  if (session && !account) {
    navigate("/onboarding");
    return;
  }

  if (!session) {
    navigate("/login");
  }
};
