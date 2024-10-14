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
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({
  authRepo,
  children
}: PropsWithChildren<{ authRepo: AuthRepository }>) => {
  const [session, setSession] = useState<Session | null>(null);

  const authService = useMemo(
    () => ({
      googleSignIn: googleSignIn(authRepo),
      getSession: getSession(authRepo),
      onAuthChange: onAuthChange(authRepo)
    }),
    [authRepo]
  );

  const initSession = useCallback(async () => {
    const newSession = await authService.getSession();
    setSession(newSession);
  }, [authService]);

  useEffect(() => {
    initSession();

    const { unsubscribe } = authService.onAuthChange(setSession);

    return () => unsubscribe();
  }, [authService, initSession]);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};
