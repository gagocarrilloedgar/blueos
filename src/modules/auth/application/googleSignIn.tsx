import { AuthRepository } from "@/modules/auth/domain";

export const googleSignIn = (repo: AuthRepository) => {
  return async function (redirectTo: string) {
    return repo.googleSignIn(redirectTo);
  };
};
