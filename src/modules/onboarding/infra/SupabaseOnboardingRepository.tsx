import { supabase } from "@/config/clients";
import { OnboardingRepository } from "../domain/OnboardingRepository";

export const createSupabaseOnboardinRepository = (): OnboardingRepository => {
  return { createTeam, createAccount, createTeamWithAccount };
};

const createTeamWithAccount = async (
  companyName: string,
  firstName: string,
  lastName: string,
  userId: string,
  userEmail: string
) => {
  const { data, error } = await supabase.rpc("create_account_team_assignment", {
    account_name: firstName + " " + lastName,
    team_name: companyName,
    user_id: userId,
    email: userEmail
  });

  if (error) throw new Error("Error creating your team account");

  if (!data?.team_id || !data?.account_id) return null;

  return { teamId: data.team_id, accountId: data.account_id };
};

const createTeam = async (name: string, size: number) => {
  const { data, error } = await supabase
    .from("teams")
    .insert({
      name,
      size
    })
    .select("id, name")
    .single();

  if (error) {
    throw new Error("Error creating your team");
  }

  return data;
};

const createAccount = async (
  firstName: string,
  lastName: string,
  userId: string
) => {
  const { data, error } = await supabase
    .from("accounts")
    .insert({
      name: firstName + " " + lastName,
      user_id: userId,
      email: "test"
    })
    .select("id, name, createdAt:created_at")
    .single();

  if (error) {
    throw new Error("Error creating your account");
  }

  return {
    name: data.name,
    id: data.id
  };
};
