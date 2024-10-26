import { ProjectsRepository } from "@/modules/dashboard/domain/ProjectsRepository";

export const getTeamDashboardAccounts = (repo: ProjectsRepository) => {
  return async ({ teamId }: { teamId: number }) => {
    try {
      const accounts = await repo.getTeamAccounts(teamId);

      const mappedAccounts = accounts.map((account) => ({
        ...account,
        createdAt: new Date(account.createdAt).toLocaleDateString()
      }));

      return { error: false, accounts: mappedAccounts };
    } catch (error) {
      console.error(error);
      return { error: true, accounts: [] };
    }
  };
};
