import { supabase } from "@/config/clients";
import { SidebarRepository } from "@/modules/sidebar/domain/SidebarRepository";

export const getTeamProjects: SidebarRepository["getTeamProjects"] = async (
  teamId
) => {
  const projects = await supabase
    .from("projects")
    .select("id, name")
    .eq("team_id", teamId);

  if (projects.error) {
    throw new Error("Error while fetching your project");
  }

  return projects.data;
};
