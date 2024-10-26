export interface ProjectCreated {
  id: number;
  name: string;
}

export interface DashboardProject {
  id: number;
  name: string;
  client: {
    id: number;
    name: string;
  } | null;
}

export interface TeamAccount {
  id: number;
  name: string;
  createdAt: string
}

export interface ProjectsRepository {
  createProject: (
    name: string,
    teamId: number,
    clientId?: number,
    description?: string
  ) => Promise<{ project: ProjectCreated; error?: string | null }>;
  getTeamProjects: (teamId: number) => Promise<DashboardProject[]>;
  getTeamAccounts: (teamId: number) => Promise<TeamAccount[]>;
}
