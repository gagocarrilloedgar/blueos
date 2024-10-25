export interface ProjectCreated {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  teamId: number;
  client: {
    id: number;
    name: string;
  } | null;
}

export interface ProjectsRepository {
  createProject: (
    name: string,
    teamId: number,
    clientId?: number,
    description?: string
  ) => Promise<{ project: ProjectCreated; error?: string | null }>;
  getTeamProjects: (teamId: number) => Promise<Project[]>;
}
