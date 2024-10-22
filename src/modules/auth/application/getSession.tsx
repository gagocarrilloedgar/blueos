import { AuthRepository } from "@/modules/auth/domain";
import { getTeamInitials } from "@/modules/teams/domain/TeamsRepository";

export const getSession = (repo: AuthRepository) => {
  return async function () {
    const session = await repo.getSession();

    if (!session)
      return {
        session: null,
        account: null
      };

    const account = await repo.getAccount(session.user.id);

    return {
      account: !account
        ? null
        : {
            ...account,
            initials: getTeamInitials(account?.name ?? "")
          },
      session
    };
  };
};
