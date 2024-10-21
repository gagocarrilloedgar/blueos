import { useContext } from "react";
import { OnboardingContext } from "./OnboardingProvider";

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("You can not use the Onboarding hook outside it's context");
  }

  return context;
};
