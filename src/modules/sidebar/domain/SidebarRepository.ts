interface CreatedTeam {
  id: number;
  name: string;
}
export interface Team extends CreatedTeam {
  avatar: string;
  plan: string;
}

export interface SidebarProject {
  id: number;
  name: string;
}

export interface SidebarRepository {
  getTeams: (accountId: number) => Promise<CreatedTeam[]>;
  getTeamProjects: (teamId: number) => Promise<SidebarProject[]>;
}

export const getTeamInitials = (name: string) => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((name) => name.charAt(0))
    .join("");
};
