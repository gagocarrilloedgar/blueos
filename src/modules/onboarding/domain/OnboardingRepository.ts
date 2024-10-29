export type CreatedAccount = {
  id: number;
  name: string;
};

export type CreatedTeam = {
  id: number;
  name: string;
};

export type CreatedTeamAccount = {
  accountId: number;
  organisationId: number;
};

export interface OnboardingRepository {
  createTeam: (name: string, size: number) => Promise<CreatedTeam | null>;
  createAccount: (
    firstName: string,
    lastName: string,
    userId: string
  ) => Promise<CreatedAccount | null>;
  createTeamWithAccount: (
    companyName: string,
    firstName: string,
    lastName: string,
    userId: string,
    userEmail: string
  ) => Promise<{ organisationId: number; accountId: number } | null>;
}
