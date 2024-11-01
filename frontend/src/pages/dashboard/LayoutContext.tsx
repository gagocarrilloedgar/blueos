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

interface ContextState {
  organisations: Organisation[];
  projects: SidebarProject[];
  chats: {
    id: number;
    name: string;
    url: string;
  }[];
  activeOrg: Organisation | null;
  setOrganisation: (team: Organisation) => void;
}

export const LayoutContext = createContext({} as ContextState);
