import { OnboardingRepository } from "../domain/OnboardingRepository";

export const createAccount = (repo: OnboardingRepository) => {
  return async function (
    firstName: string,
    lastName: string,
    organisationName: string,
    userId: string,
    userEmail: string
  ) {
    try {
      const createTeam = await repo.createTeamWithAccount(
        organisationName,
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
