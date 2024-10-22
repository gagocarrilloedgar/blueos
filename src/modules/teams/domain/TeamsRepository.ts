interface CreatedTeam {
  id: number;
  name: string;
}
export interface Team extends CreatedTeam {
  avatar: string;
  plan: string;
}

export interface TeamsRepository {
  getTeams: (accountId: number) => Promise<CreatedTeam[]>;
}

export const getTeamInitials = (name: string) => {
  return name
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");
};
