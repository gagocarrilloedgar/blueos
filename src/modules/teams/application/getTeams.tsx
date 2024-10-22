import { getTeamInitials, TeamsRepository } from "../domain/TeamsRepository";

export const getTeams = (repo: TeamsRepository) => {
  return async (accountId: number) => {
    return (await repo.getTeams(accountId)).map((team) => ({
      ...team,
      plan: "Basic",
      avatar: getTeamInitials(team.name)
    }));
  };
};
