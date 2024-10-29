import { supabase } from "@/config/clients";
import { ProjectsRepository } from "../domain/ProjectsRepository";

export const createProject: ProjectsRepository["createProject"] = async (
  name,
  organisationId,
  clientId,
  description
) => {
  const created = await supabase
    .from("projects")
    .insert([
      {
        name,
        description,
        organisation_id: organisationId,
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
