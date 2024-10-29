import {
  getTeamInitials,
  SidebarRepository
} from "../domain/SidebarRepository";

export const getSidebarOrganisations = (repo: SidebarRepository) => {
  return async (accountId: number) => {
    return (await repo.getOrganisations(accountId)).map((organisation) => ({
      ...organisation,
      plan: "Basic",
      avatar: getTeamInitials(organisation.name)
    }));
  };
};
