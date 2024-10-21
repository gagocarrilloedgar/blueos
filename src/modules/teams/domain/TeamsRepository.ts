export interface Team {
  id: number;
  name: string;
}

export interface TeamsRepository {
  getTeams: (accountId: number) => Promise<Team[]>;
}
