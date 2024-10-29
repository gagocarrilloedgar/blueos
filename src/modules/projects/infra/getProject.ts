import { supabase } from "@/config/clients";
import { ProjectsRepository } from "../domain/ProjectsRepository";

export const getTeamProjects: ProjectsRepository["getTeamProjects"] = async (
  organisationId
) => {
  const projects = await supabase
    .from("projects")
    .select(
      "id, name, organisationId:organisation_id, description, clients (id,name)"
    )
    .eq("organisation_id", organisationId);

  if (projects.error) {
    throw new Error("Error while fetching your project");
  }

  return projects.data.map(
    ({ id, name, description, organisationId, clients }) => ({
      id,
      name,
      organisationId,
      description,
      client: clients
    })
  );
};
