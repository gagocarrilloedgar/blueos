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
import { useNavigate } from "react-router-dom";
import { Account, AuthContext, ConfirmationAccount } from "./AuthContext";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [confirmationAccount, setConfirmationAccount] =
    useState<ConfirmationAccount | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const initSession = useCallback(async () => {
    const newAccount = await fetch(
      "http://localhost:3000/api/v1/accounts/session",
      {
        credentials: "include"
      }
    );

    const json = await newAccount.json();

    if (!newAccount.ok && json.message === "Not verified") {
      setConfirmationAccount({
        organisationId: json.data.organisation.id,
        organisationName: json.data.organisation.name
      });
      return navigate("/confirm");
    }

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
      confirmationAccount,
      logout
    }),
    [account, loading, logout, confirmationAccount]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
