import { supabase } from "@/config/clients";

export const getTeamAccounts = async (teamId: number) => {
  const { data, error } = await supabase
    .from("teams")
    .select(`team_assignments ( accounts (id, name, createdAt:created_at))`)
    .eq("id", teamId)
    .single();

  if (error) {
    throw new Error("There's been a problem loading your team account");
  }

  return data?.team_assignments
    .filter((teamAssignment) => teamAssignment?.accounts !== null)
    .map((teamAssignment) => {
      return {
        id: teamAssignment.accounts!.id,
        name: teamAssignment.accounts!.name,
        createdAt: teamAssignment.accounts!.createdAt
      };
    });
};
