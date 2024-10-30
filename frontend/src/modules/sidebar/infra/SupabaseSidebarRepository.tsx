import { SidebarRepository } from "../domain/SidebarRepository";
import { getOrganisations } from "./getOrganisations";
import { getTeamProjects } from "./getTeamProjects";

export const createSupabaseSidebarRepository = (): SidebarRepository => {
  return {
    getOrganisations,
    getTeamProjects: getTeamProjects
  };
};
