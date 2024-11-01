import { createContext } from "react";
import { DashboardProject, TeamAccount } from "./DashboardProjectsProvider";

interface ContextState {
  projects: DashboardProject[];
  accounts: TeamAccount[];
  loading: boolean;
  createProject: (name?: string) => Promise<void>;
  deleteProject: (projectId: number) => Promise<void>;
}

export const Context = createContext({} as ContextState);
