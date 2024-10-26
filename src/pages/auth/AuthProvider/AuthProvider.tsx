/* eslint-disable react-hooks/exhaustive-deps */
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";

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

  const initSession = useCallback(async () => {
    const newSession = await getSession(authRepo)();
    if (newSession.session) setSession(newSession.session);
    if (newSession.account) setAccount(newSession.account);
  }, [authRepo]);

  useEffect(() => {
    const { unsubscribe } = onAuthChange(authRepo)(setSession);

    return () => {
      if (unsubscribe) return unsubscribe();
    };
  }, []);

  useEffect(() => {
    initSession().finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      session,
      account,
      loading,
      googleSignIn: googleSignIn(authRepo),
      getSession: getSession(authRepo)
    }),
    [authRepo, account, session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
