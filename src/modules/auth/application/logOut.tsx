import { AuthRepository } from "@/modules/auth/domain";

export const logOut = (repo: AuthRepository) => {
  return function () {
    return repo.logOut();
  };
};
