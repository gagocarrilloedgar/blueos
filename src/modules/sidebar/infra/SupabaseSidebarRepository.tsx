import { SidebarRepository } from "../domain/SidebarRepository";
import { getSidebarTeams } from "./getSidebarTeams";
import { getTeamProjects } from "./getTeamProjects";

export const createSupabaseSidebarRepository = (): SidebarRepository => {
  return { getTeams: getSidebarTeams, getTeamProjects: getTeamProjects };
};
