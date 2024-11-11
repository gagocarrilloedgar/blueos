/* eslint-disable react-hooks/exhaustive-deps */
import {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState
} from "react";

import { getInitials } from "@/lib/getInitials";
import { useClerk } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthContext, ConfirmationAccount } from "./AuthContext";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [confirmationAccount, setConfirmationAccount] =
    useState<ConfirmationAccount | null>(null);

  const { signOut } = useClerk();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["account"],
    queryFn: () => initSession()
  });

  const initSession = async () => {
    const newAccount = await fetch(
      "http://localhost:3000/api/v1/accounts/session",
      {
        credentials: "include"
      }
    );

    const data = await newAccount.json();
    const account = data.data;

    if (!account) navigate("/login");

    if (!account?.userId) {
      setConfirmationAccount({
        organisationId: account.organisation.id,
        organisationName: account.organisation.name
      });
      navigate("/confirm");
    }

    const mappedAccount = {
      id: account.id,
      name: account.name,
      initials: getInitials(account.name),
      email: account.email,
      isAdmin: account.isAdmin,
      organisation: {
        id: account?.organisation.id,
        name: account?.organisation.name
      }
    };

    return mappedAccount;
  };

  const logout = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const value = useMemo(
    () => ({
      account: data,
      loading: isLoading,
      confirmationAccount,
      logout
    }),
    [data, isLoading, logout, confirmationAccount]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
