import { supabase } from "@/config/clients";
import { ProjectsRepository } from "../domain/ProjectsRepository";

export const getTeamProjects: ProjectsRepository["getTeamProjects"] = async (
  teamId
) => {
  const projects = await supabase
    .from("projects")
    .select("id, name, teamId:team_id, description, clients (id,name)")
    .eq("team_id", teamId);

  if (projects.error) {
    throw new Error("Error while fetching your project");
  }

  return projects.data.map(({ id, name, description, teamId, clients }) => ({
    id,
    name,
    teamId,
    description,
    client: clients
  }));
};
