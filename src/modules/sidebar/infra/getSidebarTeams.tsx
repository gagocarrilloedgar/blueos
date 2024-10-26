import { supabase } from "@/config/clients";

export const getSidebarTeams = async (accountId: number) => {
  try {
    const { data, error } = await supabase
      .from("team_assignments")
      .select("teams!inner(id, name)")
      .eq("account_id", accountId)
      .limit(5);

    if (error || !data) return [];

    const teams = data?.map((assignments) => ({ ...assignments.teams }));

    return teams;
  } catch (error) {
    console.log(error);
    return [];
  }
};
