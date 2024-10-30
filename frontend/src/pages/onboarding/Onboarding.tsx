import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Trans } from "@lingui/macro";
import { DotBackground } from "../auth/DotBackground";
import { OnboardingForm } from "./OnboardingForm";

export function Onboarding() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="z-10 mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">
            <Trans>What's your business</Trans>
          </CardTitle>
          <CardDescription>
            <Trans>
              Let's get started by creating your workspace and your profile.
            </Trans>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OnboardingForm />
        </CardContent>
      </Card>
      <DotBackground />
    </div>
  );
}
