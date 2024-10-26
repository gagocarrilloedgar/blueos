import { createContext } from "react";

import { DashboardProject } from "@/modules/dashboard/domain/ProjectsRepository";

interface ContextState {
  projects: DashboardProject[];
  loading: boolean;
  createProject: (name?: string) => Promise<void>;
}

export const Context = createContext({} as ContextState);
