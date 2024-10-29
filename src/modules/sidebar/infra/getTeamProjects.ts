import { supabase } from "@/config/clients";
import { SidebarRepository } from "@/modules/sidebar/domain/SidebarRepository";

export const getTeamProjects: SidebarRepository["getTeamProjects"] = async (
  organisationId
) => {
  const projects = await supabase
    .from("projects")
    .select("id, name")
    .eq("organisation_id", organisationId);

  if (projects.error) {
    throw new Error("Error while fetching your project");
  }

  return projects.data;
};
