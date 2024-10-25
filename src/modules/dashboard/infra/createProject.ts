import { supabase } from "@/config/clients";
import { ProjectsRepository } from "../domain/ProjectsRepository";

export const createProject: ProjectsRepository["createProject"] = async (
  name,
  teamId,
  clientId,
  description
) => {
  const created = await supabase
    .from("projects")
    .insert([
      {
        name,
        description,
        team_id: teamId,
        client_id: clientId
      }
    ])
    .select("id, name")
    .single();

  if (created.error) {
    throw new Error("Error while creating your project");
  }

  return { project: created.data };
};
