import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import { Session } from "@supabase/supabase-js";

import {
  getSession,
  googleSignIn,
  onAuthChange
} from "@/modules/auth/application";
import { AuthRepository } from "@/modules/auth/domain";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({
  authRepo,
  children
}: PropsWithChildren<{ authRepo: AuthRepository }>) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const authService = useMemo(
    () => ({
      googleSignIn: googleSignIn(authRepo),
      getSession: getSession(authRepo),
      onAuthChange: onAuthChange(authRepo)
    }),
    [authRepo]
  );

  const initSession = useCallback(async () => {
    setLoading(true);
    const newSession = await authService.getSession();
    setSession(newSession.session);
  }, [authService]);

  useEffect(() => {
    initSession().finally(() => setLoading(false));

    const { unsubscribe } = authService.onAuthChange(setSession);

    return () => unsubscribe();
  }, [authService, initSession]);

  const isEntryPoint =
    pathname === "/" || pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    if (isEntryPoint || session || loading) return;

    if (!session) navigate("/login");
  }, [navigate, isEntryPoint, session, loading]);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
