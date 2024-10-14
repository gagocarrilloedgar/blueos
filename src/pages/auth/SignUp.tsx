import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { googleSignIn } from "@/modules/auth/application";
import { AuthRepository } from "@/modules/auth/domain";
import { Trans } from "@lingui/macro";
import { DotBackground } from "./DotBackground";

export function SignUp({ authRepo }: { authRepo: AuthRepository }) {
  const signIn = () => googleSignIn(authRepo)("http://localhost:5173/app");

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="z-10 mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            <Trans>Sign Up</Trans>
          </CardTitle>
          <CardDescription>
            <Trans>Create your account today, the first month is on us.</Trans>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/*<div className="grid gap-2">
              <Label htmlFor="email">
                <Trans>Email</Trans>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              <Trans>Create an account</Trans>
            </Button>*/}
            <Button onClick={signIn} className="w-full">
              <Trans>Sign up with Google</Trans>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            <Trans>Already have an account? </Trans>{" "}
            <a href="/login" className="underline">
              <Trans> Sign in</Trans>
            </a>
          </div>
        </CardContent>
      </Card>
      <DotBackground />
    </div>
  );
}
