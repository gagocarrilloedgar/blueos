import { createContext } from "react";

export interface Organisation {
  id: number;
  name: string;
  plan: string;
  avatar: string;
}

export interface SidebarProject {
  id: number;
  name: string;
}

export interface ProjectsResponse {
  data: SidebarProject[];
  rowCount: number;
  pageCount: number;
}

interface ContextState {
  organisations: Organisation[];
  projects: ProjectsResponse | undefined;
  chats: {
    id: number;
    name: string;
    url: string;
  }[];
  activeOrg: Organisation | null;
  setOrganisation: (team: Organisation) => void;
}

export const LayoutContext = createContext({} as ContextState);
