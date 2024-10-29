import { supabase } from "@/config/clients";

export const getTeamAccounts = async (organisationId: number) => {
  const { data, error } = await supabase
    .from("memberships")
    .select(`accounts (id, name, createdAt:created_at)`)
    .eq("owner_id", organisationId)
    .eq("type", "organisation");

  if (error) {
    throw new Error("There's been a problem loading your team account");
  }

  return data
    ?.filter((membership) => membership?.accounts !== null)
    .map((membership) => {
      return {
        id: membership.accounts!.id,
        name: membership.accounts!.name,
        createdAt: membership.accounts!.createdAt
      };
    });
};
