import { useToast } from "@/hooks/use-toast";
import { createAccount } from "@/modules/onboarding/application";
import { OnboardingRepository } from "@/modules/onboarding/domain/OnboardingRepository";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

interface ContextState {
  createAccount: (
    firstName: string,
    lastName: string,
    teamName: string
  ) => Promise<void>;
}
export const OnboardingContext = createContext({} as ContextState);

export const OnboardingProvider = ({
  children,
  repo
}: PropsWithChildren<{ repo: OnboardingRepository }>) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const createNewAccount = useCallback(
    async (firstName: string, lastName: string, teamName: string) => {
      const user = session?.user;

      if (!user?.email) return;

      const res = await createAccount(repo)(
        firstName,
        lastName,
        teamName,
        user.id,
        user.email
      );

      if (!res) {
        toast({
          title: "Ups, something went wrong",
          description:
            "There was an error creating your account. Please try again later",
          variant: "destructive"
        });
        return;
      }
      toast({
        title: "Everything ready",
        description: "We will now redirect you to your new workspace"
      });
      navigate("/");
    },
    [repo, session, navigate, toast]
  );

  const value = useMemo(
    () => ({ createAccount: createNewAccount }),
    [createNewAccount]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("You can not use the Onboarding hook outside it's context");
  }

  return context;
};
