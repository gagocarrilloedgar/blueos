import { supabase } from "@/config/clients";
import { TeamsRepository } from "../domain/TeamsRepository";

export const createSupabaseTeamsRepository = (): TeamsRepository => {
  return { getTeams };
};

const getTeams = async (accountId: number) => {
  try {
    const { data, error } = await supabase
      .from("team_assignments")
      .select("teams!inner(id, name)")
      .eq("account_id", accountId);

    if (error || !data) return [];

    const teams = data?.map((assignments) => ({ ...assignments.teams }));

    return teams;
  } catch (error) {
    console.log(error);
    return [];
  }
};
