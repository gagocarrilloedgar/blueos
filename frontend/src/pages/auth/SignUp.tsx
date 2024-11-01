import { SignUp as ClerkSignUp } from "@clerk/clerk-react";

import { DotBackground } from "./DotBackground";

export function SignUp() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="z-10">
        <ClerkSignUp signInUrl="/login" />
      </div>
      <DotBackground />
    </div>
  );
}
