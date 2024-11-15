import { FastifyInstance } from "fastify";

import createClient, { createClientSchema } from "@/controller/clients/create";
import organisationClients, {
  getClientsIdScheme
} from "@/controller/clients/organization-clients";
export default async function (fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/clients/organisation/:organisationId",
    schema: {
      params: getClientsIdScheme
    },
    handler: organisationClients
  });

  fastify.route({
    method: "POST",
    url: "/clients",
    schema: {
      body: createClientSchema
    },
    handler: createClient
  });
}
