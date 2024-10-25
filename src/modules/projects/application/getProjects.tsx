import { ProjectsRepository } from "../domain/ProjectsRepository";

export const getProjects = (repo: ProjectsRepository) => {
  return async ({ teamId }: { teamId: number }) => {
    try {
      const projects = await repo.getTeamProjects(teamId);
      return { error: false, projects };
    } catch (error) {
      console.error(error);
      return { error: true, projects: null };
    }
  };
};
