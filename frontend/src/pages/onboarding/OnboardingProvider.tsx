import { useUser } from "@clerk/clerk-react";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

  const createNewAccount = useCallback(
    async (firstName: string, lastName: string, organisationName: string) => {
      const email = user?.emailAddresses[0].emailAddress;
      const userId = user?.id;
      if (!email || !userId) return;

      const res = await Promise.resolve({
        firstName,
        lastName,
        organisationName,
        userId,
        email
      });

      if (!res) {
        toast.error("Ups, something went wrong", {
          description:
            "There was an error creating your account. Please try again later"
        });
        return;
      }
      toast.success("Everything ready", {
        description: "We will now redirect you to your new workspace"
      });
      navigate("/");
    },
    [navigate]
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
