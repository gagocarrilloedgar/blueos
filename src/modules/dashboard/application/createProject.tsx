import { ProjectsRepository } from "@/modules/dashboard/domain/ProjectsRepository";

export const createProject = (repo: ProjectsRepository) => {
  return async ({
    teamId,
    name,
    description,
    clientId
  }: {
    teamId: number;
    name: string;
    description?: string;
    clientId?: number;
  }) => {
    try {
      await repo.createProject(name, teamId, clientId, description);
      return { error: false };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  };
};
