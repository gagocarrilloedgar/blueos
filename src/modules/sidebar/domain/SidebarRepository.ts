interface CreatedOrganisation {
  id: number;
  name: string;
}
export interface Organisation extends CreatedOrganisation {
  avatar: string;
  plan: string;
}

export interface SidebarProject {
  id: number;
  name: string;
}

export interface SidebarRepository {
  getOrganisations: (accountId: number) => Promise<CreatedOrganisation[]>;
  getTeamProjects: (organisationId: number) => Promise<SidebarProject[]>;
}

export const getTeamInitials = (name: string) => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((name) => name.charAt(0))
    .join("");
};
