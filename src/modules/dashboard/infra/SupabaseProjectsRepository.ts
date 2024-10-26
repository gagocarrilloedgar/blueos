import { ProjectsRepository } from "../domain/ProjectsRepository";
import { createProject } from "./createProject";
import { getTeamAccounts } from "./getTeamAccounts";
import { getTeamProjects } from "./getTeamProjects";

export const createSupabaseDashboardProjectsRepository =
  (): ProjectsRepository => {
    return { createProject, getTeamProjects, getTeamAccounts };
  };
