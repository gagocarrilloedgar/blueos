import {
  getTeamInitials,
  SidebarRepository
} from "../domain/SidebarRepository";

export const getTeams = (repo: SidebarRepository) => {
  return async (accountId: number) => {
    return (await repo.getTeams(accountId)).map((team) => ({
      ...team,
      plan: "Basic",
      avatar: getTeamInitials(team.name)
    }));
  };
};
