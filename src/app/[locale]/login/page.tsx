import { redirect } from "next/navigation";
import { auth, signIn } from "~/auth";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export default async function LoginForm() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Create or sign in with your google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button type="submit" variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
