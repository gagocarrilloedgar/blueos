import { ProjectsRepository } from "../domain/ProjectsRepository";

export const getProjects = (repo: ProjectsRepository) => {
  return async ({ organisationId }: { organisationId: number }) => {
    try {
      const projects = await repo.getTeamProjects(organisationId);
      return { error: false, projects };
    } catch (error) {
      console.error(error);
      return { error: true, projects: null };
    }
  };
};
