import { supabase } from "@/config/clients";

export const getOrganisations = async (accountId: number) => {
  try {
    const { data, error } = await supabase
      .rpc("get_organisations", { accountid: accountId })
      .limit(5);

    if (error || !data) return [];

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
