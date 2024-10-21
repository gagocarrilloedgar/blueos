import { TeamsRepository } from "../domain/TeamsRepository";

export const getTeams = (repo: TeamsRepository) => {
  return async (accountId: number) => {
    return repo.getTeams(accountId);
  };
};
