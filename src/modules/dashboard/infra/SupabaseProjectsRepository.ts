import { createProject } from "./createProject";
import { getTeamProjects } from "./getTeamProjects";

export const createSupabaseDashboardProjectsRepository = () => {
  return { createProject, getTeamProjects };
};
