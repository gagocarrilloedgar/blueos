import { supabase } from "@/config/clients";
import { ProjectsRepository } from "@/modules/dashboard/domain/ProjectsRepository";

export const getTeamProjects: ProjectsRepository["getTeamProjects"] = async (
  teamId
) => {
  const projects = await supabase
    .from("projects")
    .select("id, name, clients (id,name)")
    .eq("team_id", teamId)
    .limit(4)
    .order("created_at", { ascending: false });

  if (projects.error) {
    throw new Error("Error while fetching your project");
  }

  return projects.data.map(({ id, name, clients }) => ({
    id,
    name,
    client: clients
  }));
};
