import { useAuth } from "@clerk/clerk-react";
import { CreatedOrganisation } from "../domain/SidebarRepository";

export const getOrganisations = async (accountId: number) => {
  const { getToken } = useAuth();
  try {
    const data = await fetch(`http://localhost:3000/organisations/accounts`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`
      }
    });

    if (data.status !== 200) {
      throw new Error("Failed to fetch organisations");
    }

    const json = await data.json();

    return json as CreatedOrganisation[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
