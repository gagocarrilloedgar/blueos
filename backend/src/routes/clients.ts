import { eq } from "drizzle-orm";
import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../db";
import { clientsTable } from "../db/schema/main";

export default async function (fastify: FastifyInstance) {
  const getClientsIdScheme = z.object({
    organisationId: z.string().transform((val) => Number(val))
  });

  fastify.route({
    method: "GET",
    url: "/clients/organisation/:organisationId",
    schema: {
      params: getClientsIdScheme
    },
    handler: async (
      request: FastifyRequest<{ Params: z.infer<typeof getClientsIdScheme> }>,
      reply
    ) => {
      if (request.params.organisationId !== request.organisationId)
        return reply.status(422).send({ message: "Malformed request" });

      const clients = await db.query.clientsTable.findMany({
        columns: {
          id: true,
          name: true
        },
        where: eq(clientsTable.organisationId, request.params.organisationId)
      });

      return reply.send(clients);
    }
  });

  const createClientSchema = z.object({
    name: z.string(),
    organisationId: z.number()
  });

  // Create client
  fastify.route({
    method: "POST",
    url: "/clients",
    schema: {
      body: createClientSchema
    },
    handler: async (
      request: FastifyRequest<{ Body: z.infer<typeof createClientSchema> }>,
      reply
    ) => {
      const { organisationId } = request.body;
      const reqOrganisationId = Number(organisationId);

      if (reqOrganisationId !== request.organisationId)
        return reply.status(422).send({ message: "Malformed request" });

      await db.insert(clientsTable).values(request.body);

      return reply.status(201).send({ message: "Client created successfully" });
    }
  });
}
