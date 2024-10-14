import { AuthRepository } from "@/modules/auth/domain";

export const googleSignIn = (repo: AuthRepository) => {
  return async function (redirectTo: string) {
    const session = await repo.getSession();

    if (session?.user) await repo.logOut();

    return repo.googleSignIn(redirectTo);
  };
};
