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

export function Login({ authRepo }: { authRepo: AuthRepository }) {
  const signIn = () => googleSignIn(authRepo);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            <Trans>Login</Trans>
          </CardTitle>
          <CardDescription>
            <Trans>Welcome back, happy to seee you here again</Trans>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/*<div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            */}
            <Button onClick={signIn} className="w-full">
              <Trans>Login with Google</Trans>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            <Trans>Don&apos;t have an account? </Trans>{" "}
            <a href="/signup" className="underline">
              <Trans>Sign up</Trans>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
