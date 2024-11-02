/* eslint-disable react-hooks/exhaustive-deps */
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import { getInitials } from "@/lib/getInitials";
import { useClerk } from "@clerk/clerk-react";
import { Account, AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [token] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { signOut } = useClerk();

  const initSession = useCallback(async () => {
    const newAccount = await fetch(
      "http://localhost:3000/api/v1/accounts/session",
      {
        credentials: "include"
      }
    );

    if (!newAccount.ok) return;
    const account = await newAccount.json();

    const mappedAccount = {
      id: account.id,
      name: account.name,
      initials: getInitials(account.name),
      email: account.email
    };

    if (account) setAccount(mappedAccount);
  }, []);

  useEffect(() => {
    initSession().finally(() => setLoading(false));
  }, []);

  const logout = useCallback(async () => {
    await signOut();
  }, []);

  const value = useMemo(
    () => ({
      account,
      loading,
      token,
      logout
    }),
    [token, account, loading, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
