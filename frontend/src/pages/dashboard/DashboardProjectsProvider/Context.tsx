import { createContext } from "react";

import {
  DashboardProject,
  TeamAccount
} from "@/modules/dashboard/domain/ProjectsRepository";

interface ContextState {
  projects: DashboardProject[];
  accounts: TeamAccount[];
  loading: boolean;
  createProject: (name?: string) => Promise<void>;
}

export const Context = createContext({} as ContextState);
