import { AuthRepository } from "@/modules/auth/domain";

export const getSession = (repo: AuthRepository) => {
  return async function () {
    return repo.getSession();
  };
};
