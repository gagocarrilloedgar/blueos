import { useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../auth/AuthProvider";

interface ContextState {
  createAccount: (
    firstName: string,
    lastName: string,
    organisationName: string
  ) => Promise<void>;
}
export const OnboardingContext = createContext({} as ContextState);

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { account } = useAuth();

  const { mutate } = useMutation({
    mutationFn: async (data: { name: string; organisationName: string }) => {
      const res = fetch("http://localhost:3000/api/v1/accounts-onboarding", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      return toast.promise(res, {
        loading: "Creating account...",
        success: "Account created",
        error: "Failed to create account"
      });
    }
  });

  const createNewAccount = useCallback(
    async (firstName: string, lastName: string, organisationName: string) => {
      const email = user?.emailAddresses[0].emailAddress;
      const userId = user?.id;
      if (!email || !userId) return;

      mutate({
        name: `${firstName} ${lastName}`,
        organisationName
      });
    },
    [mutate]
  );

  const value = useMemo(
    () => ({ createAccount: createNewAccount }),
    [createNewAccount]
  );

  useEffect(() => {
    if (account?.id) navigate("/");
  }, [account?.id]);

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};
