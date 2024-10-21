import { OnboardingRepository } from "../domain/OnboardingRepository";

export const createAccount = (repo: OnboardingRepository) => {
  return async function (
    firstName: string,
    lastName: string,
    teamName: string,
    userId: string,
    userEmail: string
  ) {
    try {
      const createTeam = await repo.createTeamWithAccount(
        teamName,
        firstName,
        lastName,
        userId,
        userEmail
      );

      if (!createTeam) {
        console.log("Error");
        return null;
      }

      return createTeam;
    } catch (error) {
      console.log(error);
    }
  };
};
