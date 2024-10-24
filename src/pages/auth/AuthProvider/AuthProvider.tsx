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
import { Account } from "@/modules/auth/domain/AuthRepository";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({
  authRepo,
  children
}: PropsWithChildren<{ authRepo: AuthRepository }>) => {
  const [session, setSession] = useState<Session | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    setSession(newSession.session);
    setAccount(newSession.account);
  }, [authService]);

  useEffect(() => {
    initSession()
      .catch(() => setLoading(false))
      .finally(() => setLoading(false));

    const { unsubscribe } = authService.onAuthChange(setSession);

    return () => {
      if (unsubscribe) return unsubscribe();
    };
  }, [authService, initSession]);

  const value = useMemo(
    () => ({
      session,
      account,
      loading,
      googleSignIn: authService.googleSignIn,
      getSession: authService.getSession
    }),
    [session, account, loading, authService]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
