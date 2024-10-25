import { createProject } from "./createProject";
import { getTeamProjects } from "./getProject";

export const createSupabaseDashboardProjectsRepository = () => {
  return { createProject, getTeamProjects };
};
