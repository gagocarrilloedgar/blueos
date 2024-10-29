import { ProjectsRepository } from "../domain/ProjectsRepository";

export const createProject = (repo: ProjectsRepository) => {
  return async ({
    organisationId,
    name,
    description,
    clientId
  }: {
    organisationId: number;
    name: string;
    description?: string;
    clientId?: number;
  }) => {
    try {
      await repo.createProject(name, organisationId, clientId, description);
      return { error: false };
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  };
};
