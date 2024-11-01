import { SignIn } from "@clerk/clerk-react";
import { DotBackground } from "./DotBackground";

export function Login() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="z-10">
        <SignIn signUpUrl="/signup" />
      </div>
      <DotBackground />
    </div>
  );
}
