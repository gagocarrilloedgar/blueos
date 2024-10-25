import { DashboardProject } from "@/modules/dashboard/domain/ProjectsRepository";
import { createContext } from "react";

interface ContextState {
  projects: DashboardProject[];
  loading: boolean;
  createProject: (name?: string) => Promise<void>;
}

export const Context = createContext({} as ContextState);
