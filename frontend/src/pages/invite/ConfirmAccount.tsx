import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Trans } from "@lingui/macro";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { DotBackground } from "../auth/DotBackground";
import { ConfirmationForm } from "./ConfirmationForm";

export function ConfirmAccount() {
  const { confirmationAccount, loading } = useAuth();

  if (!confirmationAccount && !loading) return <Navigate to="/signup" />;

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="z-10 mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">
            <Trans>Welcome to {confirmationAccount?.organisationName}</Trans>
          </CardTitle>
          <CardDescription>
            <Trans>Let's get started by updating your name and last name</Trans>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ConfirmationForm confirmationAccount={confirmationAccount} />
        </CardContent>
      </Card>
      <DotBackground />
    </div>
  );
}
