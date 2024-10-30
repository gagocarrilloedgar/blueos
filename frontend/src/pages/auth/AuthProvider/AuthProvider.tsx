/* eslint-disable react-hooks/exhaustive-deps */
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import { getTeamInitials } from "@/modules/sidebar/domain/SidebarRepository";
import { useAuth } from "@clerk/clerk-react";
import { Account, AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { isSignedIn, getToken } = useAuth();

  const initSession = useCallback(async () => {
    const newAccount = await fetch("http://localhost:3000/api/v1/accounts/session", {
      credentials: "include"
    });

    if (!newAccount.ok) return;
    const account = await newAccount.json();

    const mappedAccount = {
      id: account.id,
      name: account.name,
      initials: getTeamInitials(account.name),
      email: account.email
    };

    if (account) setAccount(mappedAccount);
  }, []);

  const setLocalToken = useCallback(async () => {
    if (!isSignedIn) return;
    const token = await getToken();
    if (token) setToken(token);
  }, [getToken, isSignedIn]);

  useEffect(() => {
    setLocalToken();
  }, []);

  useEffect(() => {
    initSession().finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      account,
      loading,
      token
    }),
    [token, account, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
